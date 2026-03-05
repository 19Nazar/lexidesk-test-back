import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Prompt } from '../prompts/prompt.entity';
import { Lead } from '../leads/lead.entity';
import { Conversation } from '../conversations/conversation.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Prompt, (p) => p.user)
    prompts!: Prompt[];

    @OneToMany(() => Lead, (l) => l.user)
    leads!: Lead[];

    @OneToMany(() => Conversation, (c) => c.user)
    conversations!: Conversation[];
}
