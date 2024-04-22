import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client, Prisma } from '@prisma/client';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() client: Prisma.ClientCreateInput): Promise<Client> {
    return await this.clientService.create(client);
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return await this.clientService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() client: Prisma.ClientUpdateInput,
  ): Promise<Client> {
    return await this.clientService.update(+id, client);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Client> {
    return await this.clientService.remove(+id);
  }
}
