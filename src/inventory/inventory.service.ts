import { Injectable } from '@nestjs/common';
import { Inventory, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.InventoryCreateInput): Promise<Inventory> {
    const date = new Date(data.date);
    date.setHours(24, 0, 0, 0);
    data.date = date;

    return await this.prisma.inventory.create({
      data,
    });
  }
  
  async findAll(): Promise<Partial<Inventory>[]> {
    return await this.prisma.inventory.findMany();
  }

  async findOne(id: number): Promise<Partial<Inventory>> {
    return await this.prisma.inventory.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.InventoryUpdateInput): Promise<Inventory> {
    const date = new Date(data.date as Date);
    date.setHours(24, 0, 0, 0);
    data.date = date;
    
    return await this.prisma.inventory.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Inventory> {
    return await this.prisma.inventory.delete({
      where: { id },
    });
  }
}
