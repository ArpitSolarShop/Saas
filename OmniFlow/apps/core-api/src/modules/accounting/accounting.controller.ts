import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AccountingService } from './accounting.service';

@ApiTags('invoices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class AccountingController {
  constructor(private readonly service: AccountingService) {}

  @Get()
  @ApiOperation({ summary: 'List all invoices' })
  async findAll(@CurrentUser('workspaceId') wsId: string, @Query('page') p?: number, @Query('limit') l?: number) {
    return this.service.findAll(wsId, p || 1, l || 20);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get accounting by ID' })
  async findOne(@Param('id') id: string, @CurrentUser('workspaceId') wsId: string) {
    return this.service.findById(id, wsId);
  }

  @Post()
  @ApiOperation({ summary: 'Create accounting' })
  async create(@Body() body: any, @CurrentUser('workspaceId') wsId: string) {
    return this.service.create(wsId, body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update accounting' })
  async update(@Param('id') id: string, @Body() body: any, @CurrentUser('workspaceId') wsId: string) {
    return this.service.update(id, wsId, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete accounting' })
  async remove(@Param('id') id: string, @CurrentUser('workspaceId') wsId: string) {
    return this.service.delete(id, wsId);
  }
}
