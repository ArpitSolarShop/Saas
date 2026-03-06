import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async register(data: { email: string; password: string; firstName?: string; lastName?: string }) {
        const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (existing) {
            throw new ConflictException('Email already registered');
        }

        const passwordHash = await bcrypt.hash(data.password, 12);

        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                passwordHash,
                firstName: data.firstName,
                lastName: data.lastName,
                isVerified: true, // TODO: Email verification flow
            },
        });

        // Create a default workspace for the user
        const workspace = await this.prisma.workspace.create({
            data: {
                name: `${data.firstName || 'My'}'s Workspace`,
                slug: `ws-${user.id.slice(0, 8)}`,
                members: {
                    create: {
                        userId: user.id,
                        role: 'OWNER',
                    },
                },
            },
        });

        const tokens = await this.generateTokens(user.id, user.email, workspace.id, 'OWNER');

        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
            },
        };
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                memberships: {
                    include: { workspace: true },
                    where: { isActive: true },
                    take: 1,
                },
            },
        });

        if (!user || !user.passwordHash) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Update last active
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastActiveAt: new Date() },
        });

        const membership = user.memberships[0];
        const tokens = await this.generateTokens(
            user.id,
            user.email,
            membership?.workspaceId,
            membership?.role,
        );

        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
            },
        };
    }

    async refreshToken(refreshToken: string) {
        const session = await this.prisma.session.findUnique({
            where: { refreshToken },
            include: {
                user: {
                    include: {
                        memberships: {
                            where: { isActive: true },
                            take: 1,
                        },
                    },
                },
            },
        });

        if (!session || session.expiresAt < new Date()) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }

        const membership = session.user.memberships[0];
        return this.generateTokens(
            session.userId,
            session.user.email,
            membership?.workspaceId,
            membership?.role,
        );
    }

    private async generateTokens(userId: string, email: string, workspaceId?: string, role?: string) {
        const payload = { sub: userId, email, workspaceId, role };

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

        // Store session
        await this.prisma.session.create({
            data: {
                userId,
                token: accessToken,
                refreshToken,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            },
        });

        return {
            accessToken,
            refreshToken,
            expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
        };
    }
}
