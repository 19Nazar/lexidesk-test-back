import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { IsString, MinLength } from 'class-validator';

class UpdatePromptDto {
    @IsString()
    @MinLength(10)
    content!: string;
}

@Controller({ path: 'prompts', version: '1' })
export class PromptsController {
    constructor(private readonly promptsService: PromptsService) {}

    @Get(':userId')
    getPrompt(@Param('userId') userId: string) {
        return this.promptsService.getByUserId(userId);
    }

    @Put(':userId')
    updatePrompt(@Param('userId') userId: string, @Body() dto: UpdatePromptDto) {
        return this.promptsService.updateByUserId(userId, dto.content);
    }
}
