import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Conversation } from '../conversations/conversation.entity';

@Entity('leads')
export class Lead {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    userId!: string;

    @ManyToOne(() => User, (u) => u.leads)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column({ nullable: true })
    conversationId!: string;

    @ManyToOne(() => Conversation, { nullable: true })
    @JoinColumn({ name: 'conversationId' })
    conversation!: Conversation;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({ nullable: true })
    phone!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
