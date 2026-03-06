import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { ContactModule } from './modules/crm/contact/contact.module';
import { CompanyModule } from './modules/crm/company/company.module';
import { LeadModule } from './modules/crm/lead/lead.module';
import { DealModule } from './modules/crm/deal/deal.module';
import { PipelineModule } from './modules/crm/pipeline/pipeline.module';
import { CustomObjectModule } from './modules/custom-objects/custom-object.module';
import { WebhookModule } from './modules/webhooks/webhook.module';
import { HealthModule } from './modules/health/health.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ProjectModule } from './modules/project/project.module';
import { SupportModule } from './modules/support/support.module';
import { ProcurementModule } from './modules/procurement/procurement.module';
import { BillingModule } from './modules/billing/billing.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { SearchModule } from './modules/search/search.module';

// Phase 3 Modules
import { ManufacturingModule } from './modules/manufacturing/manufacturing.module';
import { AssetModule } from './modules/asset/asset.module';
import { AiModule } from './modules/ai/ai.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { QualityModule } from './modules/quality/quality.module';
import { SubcontractingModule } from './modules/subcontracting/subcontracting.module';
import { ExtensionModule } from './modules/extension/extension.module';
import { FleetModule } from './modules/fleet/fleet.module';
import { SmsCampaignModule } from './modules/sms-campaign/sms-campaign.module';
import { EmailSuiteModule } from './modules/email-suite/email-suite.module';

@Module({
    imports: [
        // Global config
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '../../.env',
        }),

        // Rate limiting — 60 requests per minute per IP
        ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),

        // Database
        PrismaModule,

        // Feature modules
        HealthModule,
        AuthModule,
        WorkspaceModule,
        ContactModule,
        CompanyModule,
        LeadModule,
        DealModule,
        PipelineModule,
        CustomObjectModule,
        WebhookModule,
        MessagingModule,
        AccountingModule,
        InventoryModule,
        ProjectModule,
        SupportModule,
        ProcurementModule,
        BillingModule,
        IntegrationsModule,
        SearchModule,

        // Phase 3 Features
        ManufacturingModule,
        AssetModule,
        AiModule,
        AnalyticsModule,
        QualityModule,
        SubcontractingModule,
        ExtensionModule,
        FleetModule,
        SmsCampaignModule,
        EmailSuiteModule,
    ],
    providers: [
        { provide: APP_GUARD, useClass: ThrottlerGuard },
    ],
})
export class AppModule { }
