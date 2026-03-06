import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { WebhookService } from './webhook.service';

@ApiTags('webhooks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('webhooks')
export class WebhookController {
    constructor(private readonly service: WebhookService) { }

    @Get()
    @ApiOperation({ summary: 'List all webhooks' })
    async list(@CurrentUser('workspaceId') wsId: string) {
        return this.service.listWebhooks(wsId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a webhook' })
    async create(@Body() body: { url: string; events: string[]; secret?: string; description?: string }, @CurrentUser('workspaceId') wsId: string) {
        return this.service.createWebhook(wsId, body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a webhook' })
    async update(@Param('id') id: string, @Body() body: any, @CurrentUser('workspaceId') wsId: string) {
        return this.service.updateWebhook(id, wsId, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a webhook' })
    async remove(@Param('id') id: string, @CurrentUser('workspaceId') wsId: string) {
        return this.service.deleteWebhook(id, wsId);
    }

    @Get(':id/deliveries')
    @ApiOperation({ summary: 'Get webhook delivery history' })
    async deliveries(@Param('id') id: string, @Query('page') p?: number, @Query('limit') l?: number) {
        return this.service.getDeliveries(id, p || 1, l || 20);
    }
}
