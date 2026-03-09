import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export interface ChatMessage {
    role: 'user' | 'assistant';
    text: string;
    timestamp: string;
}

@Entity('conversations')
export class Conversation {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    userId!: string;

    @ManyToOne(() => User, (u) => u.conversations)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column('json')
    messages!: ChatMessage[];

    @Column('text', { nullable: true })
    summary!: string | null;

    @Column({ default: false })
    leadCollected!: boolean;

    @CreateDateColumn()
    createdAt!: Date;
}
