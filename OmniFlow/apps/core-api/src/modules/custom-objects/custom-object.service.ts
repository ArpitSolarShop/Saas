import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomObjectService {
    constructor(private readonly prisma: PrismaService) { }

    // ── Custom Objects ─────────────────────
    async listObjects(workspaceId: string) {
        return this.prisma.customObject.findMany({
            where: { workspaceId },
            include: { fields: { orderBy: { position: 'asc' } } },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getObject(id: string, workspaceId: string) {
        const obj = await this.prisma.customObject.findFirst({
            where: { id, workspaceId },
            include: { fields: { orderBy: { position: 'asc' } } },
        });
        if (!obj) throw new NotFoundException('Custom object not found');
        return obj;
    }

    async createObject(workspaceId: string, data: {
        name: string; singularLabel: string; pluralLabel: string; icon?: string; description?: string;
    }) {
        return this.prisma.customObject.create({ data: { ...data, workspaceId } });
    }

    async deleteObject(id: string, workspaceId: string) {
        await this.prisma.customObject.deleteMany({ where: { id, workspaceId } });
        return { deleted: true };
    }

    // ── Custom Fields ──────────────────────
    async addField(objectId: string, workspaceId: string, data: {
        name: string; label: string; type: any; isRequired?: boolean; isUnique?: boolean; defaultValue?: string; options?: any; position?: number;
    }) {
        await this.getObject(objectId, workspaceId); // verify ownership
        return this.prisma.customField.create({ data: { ...data, customObjectId: objectId } });
    }

    async removeField(fieldId: string, objectId: string, workspaceId: string) {
        await this.getObject(objectId, workspaceId);
        await this.prisma.customField.delete({ where: { id: fieldId } });
        return { deleted: true };
    }

    // ── Custom Records ─────────────────────
    async listRecords(objectId: string, workspaceId: string, page = 1, limit = 20) {
        await this.getObject(objectId, workspaceId);
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.customRecord.findMany({
                where: { customObjectId: objectId },
                include: { values: { include: { customField: true } } },
                skip, take: limit, orderBy: { createdAt: 'desc' },
            }),
            this.prisma.customRecord.count({ where: { customObjectId: objectId } }),
        ]);
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }

    async createRecord(objectId: string, workspaceId: string, fieldValues: Record<string, string>) {
        await this.getObject(objectId, workspaceId);
        const fields = await this.prisma.customField.findMany({ where: { customObjectId: objectId } });

        const record = await this.prisma.customRecord.create({
            data: {
                customObjectId: objectId,
                values: {
                    create: fields
                        .filter(f => fieldValues[f.name] !== undefined)
                        .map(f => ({ customFieldId: f.id, value: String(fieldValues[f.name]) })),
                },
            },
            include: { values: { include: { customField: true } } },
        });
        return record;
    }

    async deleteRecord(recordId: string, objectId: string, workspaceId: string) {
        await this.getObject(objectId, workspaceId);
        await this.prisma.customRecord.deleteMany({ where: { id: recordId, customObjectId: objectId } });
        return { deleted: true };
    }
}
