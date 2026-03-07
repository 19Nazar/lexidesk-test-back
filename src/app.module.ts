import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PromptsModule } from './prompts/prompts.module';
import { LeadsModule } from './leads/leads.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ElevenLabsModule } from './elevenlabs/elevenlabs.module';
import { User } from './users/user.entity';
import { Prompt } from './prompts/prompt.entity';
import { Lead } from './leads/lead.entity';
import { Conversation } from './conversations/conversation.entity';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.get('DB_HOST', 'localhost'),
                port: config.get<number>('DB_PORT', 3306),
                username: config.get('DB_USERNAME', 'root'),
                password: config.get('DB_PASSWORD', ''),
                database: config.get('DB_NAME', 'lexidesk_test_back'),
                entities: [User, Prompt, Lead, Conversation],
                logging: true,
                synchronize: true,
            }),
        }),
        UsersModule,
        PromptsModule,
        LeadsModule,
        ConversationsModule,
        ElevenLabsModule,
    ],
})
export class AppModule {}
