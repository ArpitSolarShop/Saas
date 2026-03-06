import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('email')
export class EmailWorker extends WorkerHost {
    private readonly logger = new Logger(EmailWorker.name);

    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.log(`Processing email job ${job.id} for ${job.data.to}`);

        // Simulate email sending
        await new Promise((resolve) => setTimeout(resolve, 2000));

        this.logger.log(`Successfully sent email to ${job.data.to}`);
        return { success: true };
    }
}
