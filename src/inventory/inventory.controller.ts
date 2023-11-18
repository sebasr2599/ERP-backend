import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory, Prisma } from '@prisma/client';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async create(@Body() inventory: Prisma.InventoryCreateInput): Promise<Inventory> {
    return this.inventoryService.create(inventory);
  }

  @Get()
  async findAll(): Promise<Partial<Inventory>[]> {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Partial<Inventory>> {
    return this.inventoryService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() inventory: Partial<Prisma.InventoryUpdateInput>): Promise<Inventory> {
    return this.inventoryService.update(+id, inventory);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.remove(+id);
  }
}
