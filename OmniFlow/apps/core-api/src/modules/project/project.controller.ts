import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ProjectService } from './project.service';

@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  async findAll(@CurrentUser('workspaceId') wsId: string, @Query('page') p?: number, @Query('limit') l?: number) {
    return this.service.findAll(wsId, p || 1, l || 20);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  async findOne(@Param('id') id: string, @CurrentUser('workspaceId') wsId: string) {
    return this.service.findById(id, wsId);
  }

  @Post()
  @ApiOperation({ summary: 'Create project' })
  async create(@Body() body: any, @CurrentUser('workspaceId') wsId: string) {
    return this.service.create(wsId, body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project' })
  async update(@Param('id') id: string, @Body() body: any, @CurrentUser('workspaceId') wsId: string) {
    return this.service.update(id, wsId, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  async remove(@Param('id') id: string, @CurrentUser('workspaceId') wsId: string) {
    return this.service.delete(id, wsId);
  }
}
