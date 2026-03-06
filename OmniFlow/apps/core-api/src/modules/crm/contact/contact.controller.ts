import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { ContactService } from './contact.service';

@ApiTags('contacts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Get()
    @ApiOperation({ summary: 'List all contacts' })
    async findAll(@CurrentUser('workspaceId') workspaceId: string, @Query('page') page?: number, @Query('limit') limit?: number) {
        return this.contactService.findAll(workspaceId, page || 1, limit || 20);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get contact by ID' })
    async findOne(@Param('id') id: string, @CurrentUser('workspaceId') workspaceId: string) {
        return this.contactService.findById(id, workspaceId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new contact' })
    async create(@Body() body: any, @CurrentUser('workspaceId') workspaceId: string) {
        return this.contactService.create(workspaceId, body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a contact' })
    async update(@Param('id') id: string, @Body() body: any, @CurrentUser('workspaceId') workspaceId: string) {
        return this.contactService.update(id, workspaceId, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a contact' })
    async remove(@Param('id') id: string, @CurrentUser('workspaceId') workspaceId: string) {
        return this.contactService.delete(id, workspaceId);
    }
}
