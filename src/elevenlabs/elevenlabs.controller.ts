import { Controller, Get, Param, Post } from '@nestjs/common';
import { ElevenLabsService } from './elevenlabs.service';

@Controller({ path: 'elevenlabs', version: '1' })
export class ElevenLabsController {
    constructor(private readonly elevenLabsService: ElevenLabsService) {}

    @Get('signed-url/:userId')
    getSignedUrl(@Param('userId') userId: string) {
        return this.elevenLabsService.getSignedUrl(userId);
    }

    @Post('update-prompt/:userId')
    updatePrompt(@Param('userId') userId: string) {
        return this.elevenLabsService.updateAgentPrompt(userId);
    }
}
