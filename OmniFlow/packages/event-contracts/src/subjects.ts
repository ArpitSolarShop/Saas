// ============================================
// NATS Subject Definitions
// ============================================
// Convention: omniflow.<domain>.<action>

export const SUBJECTS = {
    // Auth
    USER_REGISTERED: 'omniflow.auth.user.registered',
    USER_LOGGED_IN: 'omniflow.auth.user.logged_in',

    // Workspace
    WORKSPACE_CREATED: 'omniflow.workspace.created',
    WORKSPACE_UPDATED: 'omniflow.workspace.updated',
    MEMBER_INVITED: 'omniflow.workspace.member.invited',
    MEMBER_JOINED: 'omniflow.workspace.member.joined',

    // CRM — Contacts
    CONTACT_CREATED: 'omniflow.crm.contact.created',
    CONTACT_UPDATED: 'omniflow.crm.contact.updated',
    CONTACT_DELETED: 'omniflow.crm.contact.deleted',

    // CRM — Companies
    COMPANY_CREATED: 'omniflow.crm.company.created',
    COMPANY_UPDATED: 'omniflow.crm.company.updated',
    COMPANY_DELETED: 'omniflow.crm.company.deleted',

    // CRM — Leads
    LEAD_CREATED: 'omniflow.crm.lead.created',
    LEAD_UPDATED: 'omniflow.crm.lead.updated',
    LEAD_CONVERTED: 'omniflow.crm.lead.converted',
    LEAD_DELETED: 'omniflow.crm.lead.deleted',

    // CRM — Deals
    DEAL_CREATED: 'omniflow.crm.deal.created',
    DEAL_UPDATED: 'omniflow.crm.deal.updated',
    DEAL_STAGE_CHANGED: 'omniflow.crm.deal.stage_changed',
    DEAL_WON: 'omniflow.crm.deal.won',
    DEAL_LOST: 'omniflow.crm.deal.lost',

    // Webhooks
    WEBHOOK_TRIGGERED: 'omniflow.webhook.triggered',
} as const;

export type Subject = (typeof SUBJECTS)[keyof typeof SUBJECTS];
