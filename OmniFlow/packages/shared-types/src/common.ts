import { z } from 'zod';

// ── Pagination ─────────────────────────────
export const PaginationSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
export type PaginationInput = z.infer<typeof PaginationSchema>;

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
        data: z.array(itemSchema),
        meta: z.object({
            total: z.number(),
            page: z.number(),
            limit: z.number(),
            totalPages: z.number(),
        }),
    });

// ── API Response ───────────────────────────
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        success: z.boolean(),
        data: dataSchema.optional(),
        error: z.string().optional(),
        message: z.string().optional(),
    });

// ── Common Enums ───────────────────────────
export const RoleEnum = z.enum(['OWNER', 'ADMIN', 'MEMBER', 'GUEST']);
export type RoleType = z.infer<typeof RoleEnum>;

export const PriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']);
export type PriorityType = z.infer<typeof PriorityEnum>;

// ── ID Validation ──────────────────────────
export const IdSchema = z.object({
    id: z.string().cuid(),
});
export type IdInput = z.infer<typeof IdSchema>;
