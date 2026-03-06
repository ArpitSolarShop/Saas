import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // This app doesn't need to listen on a port unless we want health checks.
    // We'll spin it up to process BullMQ jobs in the background.
    await app.listen(4001);
    console.log(`🚀 Background workers running on port 4001`);
}
bootstrap();
