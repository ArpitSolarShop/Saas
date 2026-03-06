import { z } from 'zod';

// ── Contact ────────────────────────────────
export const CreateContactSchema = z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    firstName: z.string().min(1).max(100).optional(),
    lastName: z.string().max(100).optional(),
    jobTitle: z.string().optional(),
    source: z.string().optional(),
    companyId: z.string().cuid().optional(),
    customFields: z.record(z.unknown()).optional(),
});
export type CreateContactInput = z.infer<typeof CreateContactSchema>;
export const UpdateContactSchema = CreateContactSchema.partial();
export type UpdateContactInput = z.infer<typeof UpdateContactSchema>;

// ── Company ────────────────────────────────
export const CreateCompanySchema = z.object({
    name: z.string().min(1).max(200),
    domain: z.string().optional(),
    industry: z.string().optional(),
    size: z.string().optional(),
    website: z.string().url().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    annualRevenue: z.number().optional(),
    description: z.string().optional(),
    customFields: z.record(z.unknown()).optional(),
});
export type CreateCompanyInput = z.infer<typeof CreateCompanySchema>;
export const UpdateCompanySchema = CreateCompanySchema.partial();
export type UpdateCompanyInput = z.infer<typeof UpdateCompanySchema>;

// ── Lead ───────────────────────────────────
export const CreateLeadSchema = z.object({
    title: z.string().min(1).max(200),
    source: z.string().optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
    value: z.number().optional(),
    description: z.string().optional(),
    contactId: z.string().cuid().optional(),
    companyId: z.string().cuid().optional(),
    customFields: z.record(z.unknown()).optional(),
});
export type CreateLeadInput = z.infer<typeof CreateLeadSchema>;
export const UpdateLeadSchema = CreateLeadSchema.partial();
export type UpdateLeadInput = z.infer<typeof UpdateLeadSchema>;

// ── Deal ───────────────────────────────────
export const CreateDealSchema = z.object({
    title: z.string().min(1).max(200),
    value: z.number().optional(),
    currency: z.string().default('USD'),
    expectedCloseDate: z.coerce.date().optional(),
    pipelineId: z.string().cuid(),
    stageId: z.string().cuid(),
    contactId: z.string().cuid().optional(),
    companyId: z.string().cuid().optional(),
    customFields: z.record(z.unknown()).optional(),
});
export type CreateDealInput = z.infer<typeof CreateDealSchema>;
export const UpdateDealSchema = CreateDealSchema.partial();
export type UpdateDealInput = z.infer<typeof UpdateDealSchema>;

// ── Pipeline ───────────────────────────────
export const CreatePipelineSchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().optional(),
    stages: z.array(z.object({
        name: z.string().min(1),
        color: z.string().optional(),
        position: z.number().int(),
        probability: z.number().min(0).max(100).optional(),
    })).min(1),
});
export type CreatePipelineInput = z.infer<typeof CreatePipelineSchema>;

// ── Activity ───────────────────────────────
export const CreateActivitySchema = z.object({
    type: z.enum(['CALL', 'EMAIL', 'MEETING', 'TASK', 'NOTE', 'FOLLOW_UP']),
    title: z.string().min(1).max(200),
    description: z.string().optional(),
    dueDate: z.coerce.date().optional(),
    contactId: z.string().cuid().optional(),
    companyId: z.string().cuid().optional(),
    leadId: z.string().cuid().optional(),
    dealId: z.string().cuid().optional(),
});
export type CreateActivityInput = z.infer<typeof CreateActivitySchema>;
