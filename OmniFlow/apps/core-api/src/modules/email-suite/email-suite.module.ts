import { Module } from '@nestjs/common';
import { EmailSuiteController } from './email-suite.controller';
import { EmailSuiteService } from './email-suite.service';

@Module({ controllers: [EmailSuiteController], providers: [EmailSuiteService], exports: [EmailSuiteService] })
export class EmailSuiteModule {}
