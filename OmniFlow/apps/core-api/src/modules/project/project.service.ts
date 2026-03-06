import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(workspaceId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.project.findMany({ where: { workspaceId }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.project.count({ where: { workspaceId } }),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findById(id: string, workspaceId: string) {
    return this.prisma.project.findFirst({ where: { id, workspaceId } });
  }

  async create(workspaceId: string, data: any) {
    return this.prisma.project.create({ data: { ...data, workspaceId } });
  }

  async update(id: string, workspaceId: string, data: any) {
    await this.prisma.project.updateMany({ where: { id, workspaceId }, data });
    return this.findById(id, workspaceId);
  }

  async delete(id: string, workspaceId: string) {
    return this.prisma.project.deleteMany({ where: { id, workspaceId } });
  }
}
