import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('prompts')
export class Prompt {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Index()
    @Column()
    userId!: string;

    @ManyToOne(() => User, (u) => u.prompts)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column('text')
    content!: string;

    @UpdateDateColumn()
    updatedAt!: Date;
}
