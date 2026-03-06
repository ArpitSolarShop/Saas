import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AccountingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(workspaceId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.invoice.findMany({ where: { workspaceId }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.invoice.count({ where: { workspaceId } }),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findById(id: string, workspaceId: string) {
    return this.prisma.invoice.findFirst({ where: { id, workspaceId } });
  }

  async create(workspaceId: string, data: any) {
    return this.prisma.invoice.create({ data: { ...data, workspaceId } });
  }

  async update(id: string, workspaceId: string, data: any) {
    await this.prisma.invoice.updateMany({ where: { id, workspaceId }, data });
    return this.findById(id, workspaceId);
  }

  async delete(id: string, workspaceId: string) {
    return this.prisma.invoice.deleteMany({ where: { id, workspaceId } });
  }
}
