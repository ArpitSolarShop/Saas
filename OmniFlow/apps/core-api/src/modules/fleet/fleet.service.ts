import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FleetService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(workspaceId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      (this.prisma.fleetDevice as any).findMany({ where: { workspaceId }, skip, take: limit }),
      (this.prisma.fleetDevice as any).count({ where: { workspaceId } }),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findById(id: string, workspaceId: string) {
    return (this.prisma.fleetDevice as any).findFirst({ where: { id, workspaceId } });
  }

  async create(workspaceId: string, data: any) {
    return (this.prisma.fleetDevice as any).create({ data: { ...data, workspaceId } });
  }

  async update(id: string, workspaceId: string, data: any) {
    await (this.prisma.fleetDevice as any).updateMany({ where: { id, workspaceId }, data });
    return this.findById(id, workspaceId);
  }

  async delete(id: string, workspaceId: string) {
    return (this.prisma.fleetDevice as any).deleteMany({ where: { id, workspaceId } });
  }
}
