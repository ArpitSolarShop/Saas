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
    ],
    providers: [
        { provide: APP_GUARD, useClass: ThrottlerGuard },
    ],
})
export class AppModule { }
