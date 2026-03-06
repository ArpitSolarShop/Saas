import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WebhookService {
    private readonly logger = new Logger(WebhookService.name);

    constructor(private readonly prisma: PrismaService) { }

    async listWebhooks(workspaceId: string) {
        return this.prisma.webhook.findMany({ where: { workspaceId }, orderBy: { createdAt: 'desc' } });
    }

    async createWebhook(workspaceId: string, data: { url: string; events: string[]; secret?: string; description?: string }) {
        return this.prisma.webhook.create({ data: { ...data, workspaceId } });
    }

    async updateWebhook(id: string, workspaceId: string, data: { url?: string; events?: string[]; isActive?: boolean }) {
        await this.prisma.webhook.updateMany({ where: { id, workspaceId }, data });
        return this.prisma.webhook.findFirst({ where: { id, workspaceId } });
    }

    async deleteWebhook(id: string, workspaceId: string) {
        await this.prisma.webhook.deleteMany({ where: { id, workspaceId } });
        return { deleted: true };
    }

    async getDeliveries(webhookId: string, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.webhookDelivery.findMany({ where: { webhookId }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
            this.prisma.webhookDelivery.count({ where: { webhookId } }),
        ]);
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }

    // Trigger webhooks for an event
    async triggerEvent(workspaceId: string, event: string, payload: Record<string, any>) {
        const webhooks = await this.prisma.webhook.findMany({
            where: { workspaceId, isActive: true, events: { has: event } },
        });

        // Log event
        await this.prisma.eventLog.create({
            data: {
                type: event,
                entityType: event.split('.')[0],
                entityId: payload.id || '',
                payload: payload as any,
                workspaceId,
            },
        });

        // Fire webhooks asynchronously
        for (const webhook of webhooks) {
            this.deliverWebhook(webhook.id, webhook.url, webhook.secret, event, payload);
        }
    }

    private async deliverWebhook(webhookId: string, url: string, secret: string | null, event: string, payload: Record<string, any>) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-OmniFlow-Event': event,
                    ...(secret ? { 'X-OmniFlow-Secret': secret } : {}),
                },
                body: JSON.stringify({ event, data: payload, timestamp: new Date().toISOString() }),
                signal: AbortSignal.timeout(10000),
            });

            await this.prisma.webhookDelivery.create({
                data: {
                    webhookId, event, payload: payload as any,
                    responseCode: response.status,
                    responseBody: await response.text().catch(() => ''),
                    deliveredAt: new Date(),
                },
            });
        } catch (error: any) {
            this.logger.error(`Webhook delivery failed: ${url}`, error.message);
            await this.prisma.webhookDelivery.create({
                data: {
                    webhookId, event, payload: payload as any,
                    error: error.message,
                },
            });
        }
    }
}
