import { Module } from '@nestjs/common';
import { ElevenLabsService } from './elevenlabs.service';
import { ElevenLabsController } from './elevenlabs.controller';
import { PromptsModule } from '../prompts/prompts.module';

@Module({
    imports: [PromptsModule],
    providers: [ElevenLabsService],
    controllers: [ElevenLabsController],
    exports: [ElevenLabsService],
})
export class ElevenLabsModule {}
