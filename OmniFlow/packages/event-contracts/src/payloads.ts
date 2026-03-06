import { z } from 'zod';

// ── Base Event ─────────────────────────────
export const BaseEventSchema = z.object({
    eventId: z.string().cuid(),
    timestamp: z.string().datetime(),
    workspaceId: z.string(),
    userId: z.string().optional(),
});

// ── CRM Events ─────────────────────────────
export const EntityEventSchema = BaseEventSchema.extend({
    entityType: z.enum(['contact', 'company', 'lead', 'deal']),
    entityId: z.string(),
    data: z.record(z.unknown()),
    previousData: z.record(z.unknown()).optional(),
});
export type EntityEvent = z.infer<typeof EntityEventSchema>;

// ── Deal Stage Changed ─────────────────────
export const DealStageChangedSchema = BaseEventSchema.extend({
    dealId: z.string(),
    previousStageId: z.string(),
    newStageId: z.string(),
    dealValue: z.number().optional(),
});
export type DealStageChangedEvent = z.infer<typeof DealStageChangedSchema>;

// ── Webhook Trigger ────────────────────────
export const WebhookTriggerSchema = z.object({
    webhookId: z.string(),
    url: z.string().url(),
    event: z.string(),
    payload: z.record(z.unknown()),
});
export type WebhookTriggerEvent = z.infer<typeof WebhookTriggerSchema>;
