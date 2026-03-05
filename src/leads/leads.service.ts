import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';
import { CreateLeadDto } from './dto/CreateLeadDto';

@Injectable()
export class LeadsService {
    constructor(
        @InjectRepository(Lead)
        private readonly leadsRepository: Repository<Lead>,
    ) {}

    async create(dto: CreateLeadDto): Promise<Lead> {
        const lead = this.leadsRepository.create(dto);
        return this.leadsRepository.save(lead);
    }

    async findByUserId(userId: string): Promise<Lead[]> {
        return this.leadsRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
}
