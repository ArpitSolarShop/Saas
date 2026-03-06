import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { EmailWorker } from './workers/email.worker';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '../../.env',
        }),
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                connection: {
                    host: configService.get('REDIS_HOST', 'localhost'),
                    port: configService.get<number>('REDIS_PORT', 6379),
                },
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue({
            name: 'email',
        }),
    ],
    providers: [EmailWorker],
})
export class AppModule { }
