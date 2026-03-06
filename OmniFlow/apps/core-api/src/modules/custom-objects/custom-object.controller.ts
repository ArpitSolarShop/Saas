import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CustomObjectService } from './custom-object.service';

@ApiTags('custom-objects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('custom-objects')
export class CustomObjectController {
    constructor(private readonly service: CustomObjectService) { }

    @Get()
    @ApiOperation({ summary: 'List all custom objects' })
    async listObjects(@CurrentUser('workspaceId') wsId: string) {
        return this.service.listObjects(wsId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get custom object by ID' })
    async getObject(@Param('id') id: string, @CurrentUser('workspaceId') wsId: string) {
        return this.service.getObject(id, wsId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a custom object' })
    async createObject(@Body() body: any, @CurrentUser('workspaceId') wsId: string) {
        return this.service.createObject(wsId, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a custom object' })
    async deleteObject(@Param('id') id: string, @CurrentUser('workspaceId') wsId: string) {
        return this.service.deleteObject(id, wsId);
    }

    // ── Fields ─────────────────────────────
    @Post(':id/fields')
    @ApiOperation({ summary: 'Add a field to a custom object' })
    async addField(@Param('id') oid: string, @Body() body: any, @CurrentUser('workspaceId') wsId: string) {
        return this.service.addField(oid, wsId, body);
    }

    @Delete(':id/fields/:fieldId')
    @ApiOperation({ summary: 'Remove a field from a custom object' })
    async removeField(@Param('id') oid: string, @Param('fieldId') fid: string, @CurrentUser('workspaceId') wsId: string) {
        return this.service.removeField(fid, oid, wsId);
    }

    // ── Records ────────────────────────────
    @Get(':id/records')
    @ApiOperation({ summary: 'List records for a custom object' })
    async listRecords(@Param('id') oid: string, @CurrentUser('workspaceId') wsId: string, @Query('page') p?: number, @Query('limit') l?: number) {
        return this.service.listRecords(oid, wsId, p || 1, l || 20);
    }

    @Post(':id/records')
    @ApiOperation({ summary: 'Create a record for a custom object' })
    async createRecord(@Param('id') oid: string, @Body() body: Record<string, string>, @CurrentUser('workspaceId') wsId: string) {
        return this.service.createRecord(oid, wsId, body);
    }

    @Delete(':id/records/:recordId')
    @ApiOperation({ summary: 'Delete a record' })
    async deleteRecord(@Param('id') oid: string, @Param('recordId') rid: string, @CurrentUser('workspaceId') wsId: string) {
        return this.service.deleteRecord(rid, oid, wsId);
    }
}
