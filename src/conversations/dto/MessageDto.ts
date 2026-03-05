import { IsString } from 'class-validator';

export class MessageDto {
    @IsString()
    role!: 'user' | 'assistant';

    @IsString()
    text!: string;

    @IsString()
    timestamp!: string;
}
