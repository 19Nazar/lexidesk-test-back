import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';
import { ChatMessage } from '../conversation.entity';
import { MessageDto } from './MessageDto';

export class UpdateConversationDto {
    @IsOptional()
    @IsArray()
    @Type(() => MessageDto)
    messages?: ChatMessage[];

    @IsOptional()
    @IsBoolean()
    leadCollected?: boolean;
}
