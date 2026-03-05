import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLeadDto {
    @IsUUID()
    userId!: string;

    @IsOptional()
    @IsUUID()
    conversationId?: string;

    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsOptional()
    @IsString()
    phone?: string;
}
