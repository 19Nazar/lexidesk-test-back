import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PromptsService } from '../prompts/prompts.service';
import axios from 'axios';

interface SignedUrlResponse {
    signed_url: string;
}

@Injectable()
export class ElevenLabsService {
    private readonly apiKey: string;
    private readonly agentId: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly promptsService: PromptsService,
    ) {
        this.apiKey = this.configService.get<string>('ELEVENLABS_API_KEY') ?? '';
        this.agentId = this.configService.get<string>('ELEVENLABS_AGENT_ID') ?? '';
    }

    async getSignedUrl(userId: string): Promise<{ signedUrl: string; agentId: string }> {
        try {
            // Get user's custom prompt
            const promptRecord = await this.promptsService.getByUserId(userId);

            console.log({ agentId: this.agentId, apiKey: this.apiKey });

            // Override agent's system prompt dynamically via ElevenLabs API
            // First get a signed URL for the WebSocket connection
            const response = await axios.get<SignedUrlResponse>(
                `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${this.agentId}`,
                {
                    headers: {
                        'xi-api-key': this.apiKey,
                    },
                },
            );

            console.log(response.data);

            return {
                signedUrl: response.data.signed_url,
                agentId: this.agentId,
            };
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to get Signed Url: ' + (error instanceof Error ? error.message : ''),
            );
        }
    }

    async updateAgentPrompt(userId: string): Promise<void> {
        const promptRecord = await this.promptsService.getByUserId(userId);

        await axios.patch(
            `https://api.elevenlabs.io/v1/convai/agents/${this.agentId}`,
            {
                conversation_config: {
                    agent: {
                        prompt: {
                            prompt: promptRecord.content,
                        },
                    },
                },
            },
            {
                headers: {
                    'xi-api-key': this.apiKey,
                    'Content-Type': 'application/json',
                },
            },
        );
    }
}
