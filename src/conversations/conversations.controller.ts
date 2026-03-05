import { Controller, Post, Get, Param, Body, Put, Patch } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/CreateConversationDto';
import { UpdateConversationDto } from './dto/UpdateConversationDto';

@Controller({ path: 'conversations', version: '1' })
export class ConversationsController {
    constructor(private readonly conversationsService: ConversationsService) {}

    @Post()
    create(@Body() dto: CreateConversationDto) {
        return this.conversationsService.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateConversationDto) {
        return this.conversationsService.update(id, dto);
    }

    @Get(':userId')
    findByUser(@Param('userId') userId: string) {
        return this.conversationsService.findByUserId(userId);
    }

    @Post(':id/summarize')
    summarize(@Param('id') id: string) {
        return this.conversationsService.summarize(id);
    }
}
