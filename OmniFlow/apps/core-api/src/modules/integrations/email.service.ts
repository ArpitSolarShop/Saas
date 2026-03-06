import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    async sendEmail(to: string, subject: string, body: string, attachments?: any[]) {
        this.logger.log(`[Email] Sending to ${to} - Subj: ${subject}`);
        // TODO: Implement Nodemailer, Resend, or AWS SES
        return { success: true, provider: 'stub', messageId: `msg_${Date.now()}` };
    }
}
