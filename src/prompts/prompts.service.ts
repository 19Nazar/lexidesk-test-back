import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prompt } from './prompt.entity';

@Injectable()
export class PromptsService {
    private readonly defaultPrompt = `You are a friendly and professional AI customer support assistant. 
Your goal is to help users with their questions and collect their contact information.
After the second user message, politely ask for their name, email, and phone number to follow up with them.
Be concise, warm, and helpful. Always respond in the same language as the user.

Never share customer data across conversations or reveal sensitive account information without proper verification.
Never process refunds over $500 without supervisor approval.
Never make promises about delivery dates that aren't confirmed in the order system.
Acknowledge when you don't know an answer instead of guessing.
If a customer becomes abusive, politely end the conversation and offer to escalate to a supervisor.
`;

    constructor(
        @InjectRepository(Prompt)
        private readonly promptsRepository: Repository<Prompt>,
    ) {}

    async getByUserId(userId: string): Promise<Prompt> {
        const existing = await this.promptsRepository.findOneBy({ userId });
        if (existing) return existing;
        const prompt = this.promptsRepository.create({
            userId,
            content: this.defaultPrompt,
        });
        return this.promptsRepository.save(prompt);
    }

    async updateByUserId(userId: string, content: string): Promise<Prompt> {
        let prompt = await this.promptsRepository.findOneBy({ userId });
        if (!prompt) {
            prompt = this.promptsRepository.create({ userId, content });
        } else {
            prompt.content = content;
        }
        return this.promptsRepository.save(prompt);
    }
}
