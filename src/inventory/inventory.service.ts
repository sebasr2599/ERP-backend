import { Injectable } from '@nestjs/common';
import { Inventory, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { InventoryDTO } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: InventoryDTO, userId: number): Promise<Inventory> {
    const date = new Date(Date.now());
    data.date = date;
    data.userId = userId;
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
  // not needed
  async update(
    id: number,
    data: Prisma.InventoryUpdateInput,
  ): Promise<Inventory> {
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
