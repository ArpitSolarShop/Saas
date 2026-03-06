import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SmsService {
    private readonly logger = new Logger(SmsService.name);

    async sendSms(to: string, message: string) {
        this.logger.log(`[SMS] Sending to ${to} - Msg: ${message}`);
        // TODO: Implement Twilio or MessageBird
        return { success: true, provider: 'stub', messageId: `sms_${Date.now()}` };
    }
}
