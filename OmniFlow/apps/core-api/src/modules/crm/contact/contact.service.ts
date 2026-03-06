import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ContactService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(workspaceId: string, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.contact.findMany({ where: { workspaceId }, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { company: { select: { id: true, name: true } } } }),
            this.prisma.contact.count({ where: { workspaceId } }),
        ]);
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }

    async findById(id: string, workspaceId: string) {
        return this.prisma.contact.findFirst({ where: { id, workspaceId }, include: { company: true, activities: { take: 10, orderBy: { createdAt: 'desc' } }, notes: { take: 10, orderBy: { createdAt: 'desc' } } } });
    }

    async create(workspaceId: string, data: { email?: string; phone?: string; firstName?: string; lastName?: string; jobTitle?: string; source?: string; companyId?: string }) {
        return this.prisma.contact.create({ data: { ...data, workspaceId } });
    }

    async update(id: string, workspaceId: string, data: Partial<{ email: string; phone: string; firstName: string; lastName: string; jobTitle: string; companyId: string }>) {
        return this.prisma.contact.updateMany({ where: { id, workspaceId }, data }).then(() => this.findById(id, workspaceId));
    }

    async delete(id: string, workspaceId: string) {
        return this.prisma.contact.deleteMany({ where: { id, workspaceId } });
    }
}
