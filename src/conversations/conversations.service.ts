import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Conversation } from './conversation.entity';
import { CreateConversationDto } from './dto/CreateConversationDto';
import { UpdateConversationDto } from './dto/UpdateConversationDto';

@Injectable()
export class ConversationsService {
    constructor(
        @InjectRepository(Conversation)
        private readonly convRepository: Repository<Conversation>,
        private readonly configService: ConfigService,
    ) {}

    async create(dto: CreateConversationDto): Promise<Conversation> {
        const conv = this.convRepository.create({ userId: dto.userId, messages: [] });
        return this.convRepository.save(conv);
    }

    async update(id: string, dto: UpdateConversationDto): Promise<Conversation> {
        const conv = await this.findOne(id);
        if (dto.messages !== undefined) conv.messages = dto.messages;
        if (dto.leadCollected !== undefined) conv.leadCollected = dto.leadCollected;
        return this.convRepository.save(conv);
    }

    async findOne(id: string): Promise<Conversation> {
        const conv = await this.convRepository.findOneBy({ id });
        if (!conv) throw new NotFoundException(`Conversation ${id} not found`);
        return conv;
    }

    async findByUserId(userId: string): Promise<Conversation[]> {
        return this.convRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }

    async summarize(id: string): Promise<Conversation> {
        try {
            const conv = await this.findOne(id);

            if (!conv.messages || conv.messages.length === 0) {
                conv.summary = 'No messages in this conversation.';
                return this.convRepository.save(conv);
            }

            const transcript = conv.messages
                .map((m) => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`)
                .join('\n');

            const { GoogleGenAI } = await import('@google/genai');

            const genAI = new GoogleGenAI({
                apiKey: this.configService.get<string>('GEMINI_API_KEY') ?? '',
            });

            const response = await genAI.models.generateContent({
                model: 'gemini-2.5-flash-lite',
                contents: `Summarize this customer support conversation in 2-3 sentences. Focus on: what the user needed, whether it was resolved, and any follow-up actions.\n\nTranscript:\n${transcript}`,
            });

            conv.summary = response.text ?? '';
            return this.convRepository.save(conv);
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to summarize: ' + (error instanceof Error ? error.message : ''),
            );
        }
    }
}
