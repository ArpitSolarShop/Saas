import { z } from 'zod';

// ── Registration ───────────────────────────
export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(128),
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100).optional(),
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

// ── Login ──────────────────────────────────
export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});
export type LoginInput = z.infer<typeof LoginSchema>;

// ── Token Response ─────────────────────────
export const TokenResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresIn: z.number(),
    user: z.object({
        id: z.string(),
        email: z.string(),
        firstName: z.string().nullable(),
        lastName: z.string().nullable(),
        avatar: z.string().nullable(),
    }),
});
export type TokenResponse = z.infer<typeof TokenResponseSchema>;

// ── JWT Payload ────────────────────────────
export const JwtPayloadSchema = z.object({
    sub: z.string(), // userId
    email: z.string(),
    workspaceId: z.string().optional(),
    role: z.enum(['OWNER', 'ADMIN', 'MEMBER', 'GUEST']).optional(),
});
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;

// ── Change Password ────────────────────────
export const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8).max(128),
});
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

// ── Update Profile ─────────────────────────
export const UpdateProfileSchema = z.object({
    firstName: z.string().min(1).max(100).optional(),
    lastName: z.string().max(100).optional(),
    phone: z.string().optional(),
    avatar: z.string().url().optional(),
});
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
