import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { SmsService } from './sms.service';
import { WhatsappService } from './whatsapp.service';

@Module({
    providers: [EmailService, SmsService, WhatsappService],
    exports: [EmailService, SmsService, WhatsappService],
})
export class IntegrationsModule { }
