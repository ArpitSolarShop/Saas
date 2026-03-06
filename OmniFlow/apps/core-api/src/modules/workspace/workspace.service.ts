import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WorkspaceService {
    constructor(private readonly prisma: PrismaService) { }

    async findAllForUser(userId: string) {
        return this.prisma.workspace.findMany({
            where: { members: { some: { userId, isActive: true } } },
            include: { members: { where: { userId }, select: { role: true } } },
        });
    }

    async findById(id: string) {
        return this.prisma.workspace.findUnique({
            where: { id },
            include: { members: { include: { user: { select: { id: true, email: true, firstName: true, lastName: true, avatar: true } } } } },
        });
    }

    async update(id: string, data: { name?: string; timezone?: string; currency?: string }) {
        return this.prisma.workspace.update({ where: { id }, data });
    }
}
