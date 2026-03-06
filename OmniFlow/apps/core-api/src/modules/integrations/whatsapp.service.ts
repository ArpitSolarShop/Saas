import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WhatsappService {
    private readonly logger = new Logger(WhatsappService.name);

    async sendTemplate(to: string, templateName: string, variables: Record<string, string>) {
        this.logger.log(`[WhatsApp] Sending template '${templateName}' to ${to}`);
        // TODO: Implement Meta Graph API or Twilio WhatsApp API
        return { success: true, provider: 'stub', messageId: `wa_tpl_${Date.now()}` };
    }

    async sendText(to: string, message: string) {
        this.logger.log(`[WhatsApp] Sending text to ${to} - Msg: ${message}`);
        return { success: true, provider: 'stub', messageId: `wa_txt_${Date.now()}` };
    }
}
