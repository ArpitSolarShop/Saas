import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { WorkspaceService } from './workspace.service';

@ApiTags('workspaces')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workspaces')
export class WorkspaceController {
    constructor(private readonly workspaceService: WorkspaceService) { }

    @Get()
    @ApiOperation({ summary: 'Get all workspaces for current user' })
    async findAll(@CurrentUser('id') userId: string) {
        return this.workspaceService.findAllForUser(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get workspace by ID' })
    async findOne(@Param('id') id: string) {
        return this.workspaceService.findById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update workspace settings' })
    async update(@Param('id') id: string, @Body() body: { name?: string; timezone?: string; currency?: string }) {
        return this.workspaceService.update(id, body);
    }
}
