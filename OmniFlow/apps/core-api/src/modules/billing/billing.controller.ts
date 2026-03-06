import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { BillingService } from './billing.service';

@ApiTags('subscriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('subscriptions')
export class BillingController {
  constructor(private readonly service: BillingService) {}

  @Get()
  @ApiOperation({ summary: 'List all subscriptions' })
  async findAll(@CurrentUser('workspaceId') wsId: string, @Query('page') p?: number, @Query('limit') l?: number) {
    return this.service.findAll(wsId, p || 1, l || 20);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get billing by ID' })
  async findOne(@Param('id') id: string, @CurrentUser('workspaceId') wsId: string) {
    return this.service.findById(id, wsId);
  }

  @Post()
  @ApiOperation({ summary: 'Create billing' })
  async create(@Body() body: any, @CurrentUser('workspaceId') wsId: string) {
    return this.service.create(wsId, body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update billing' })
  async update(@Param('id') id: string, @Body() body: any, @CurrentUser('workspaceId') wsId: string) {
    return this.service.update(id, wsId, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete billing' })
  async remove(@Param('id') id: string, @CurrentUser('workspaceId') wsId: string) {
    return this.service.delete(id, wsId);
  }
}
