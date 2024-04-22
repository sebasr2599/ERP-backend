import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquivalentUnitService } from './equivalent-unit.service';
import { EquivalentUnit, Prisma } from '@prisma/client';

@Controller('equivalent-unit')
export class EquivalentUnitController {
  constructor(private readonly equivalentUnitService: EquivalentUnitService) {}

  @Post()
  async create(@Body() data: Prisma.EquivalentUnitCreateInput): Promise<EquivalentUnit> {
    return this.equivalentUnitService.create(data);
  }

  @Get()
  async findAll(): Promise<Partial<EquivalentUnit>[]> {
    return this.equivalentUnitService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Partial<EquivalentUnit>> {
    return this.equivalentUnitService.findOne(+id);
  }

  @Get('product/:productId')
  async findAllByProductId(@Param('productId') productId: string): Promise<Partial<EquivalentUnit>[]> {
    return this.equivalentUnitService.findAllByProductId(+productId);
  }

  @Patch(':id')
  async update( @Param('id') id: string, @Body() data: Prisma.EquivalentUnitUpdateInput): Promise<EquivalentUnit> {
    return this.equivalentUnitService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<EquivalentUnit> {
    return this.equivalentUnitService.remove(+id);
  }
}
