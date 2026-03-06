import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { ContactModule } from './modules/crm/contact/contact.module';
import { CompanyModule } from './modules/crm/company/company.module';
import { LeadModule } from './modules/crm/lead/lead.module';
import { DealModule } from './modules/crm/deal/deal.module';
import { PipelineModule } from './modules/crm/pipeline/pipeline.module';
import { HealthModule } from './modules/health/health.module';

@Module({
    imports: [
        // Global config
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '../../.env',
        }),

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
    ],
})
export class AppModule { }
