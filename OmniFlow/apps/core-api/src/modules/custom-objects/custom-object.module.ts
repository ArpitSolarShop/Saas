import { Module } from '@nestjs/common';
import { CustomObjectController } from './custom-object.controller';
import { CustomObjectService } from './custom-object.service';

@Module({
    controllers: [CustomObjectController],
    providers: [CustomObjectService],
    exports: [CustomObjectService],
})
export class CustomObjectModule { }
