import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/CreateLeadDto';

@Controller({ path: 'leads', version: '1' })
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) {}

    @Post()
    create(@Body() dto: CreateLeadDto) {
        return this.leadsService.create(dto);
    }

    @Get(':userId')
    findByUser(@Param('userId') userId: string) {
        return this.leadsService.findByUserId(userId);
    }
}
