import { z } from 'zod';

// ── Workspace ──────────────────────────────
export const CreateWorkspaceSchema = z.object({
    name: z.string().min(2).max(100),
    slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
    timezone: z.string().default('UTC'),
    currency: z.string().default('USD'),
});
export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>;

export const UpdateWorkspaceSchema = CreateWorkspaceSchema.partial();
export type UpdateWorkspaceInput = z.infer<typeof UpdateWorkspaceSchema>;

// ── Invite Member ──────────────────────────
export const InviteMemberSchema = z.object({
    email: z.string().email(),
    role: z.enum(['ADMIN', 'MEMBER', 'GUEST']).default('MEMBER'),
});
export type InviteMemberInput = z.infer<typeof InviteMemberSchema>;
