import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetail, Prisma } from '@prisma/client';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  async create(@Body() data: Prisma.OrderDetailCreateInput): Promise<OrderDetail> {
    return this.orderDetailService.create(data);
  }

  @Get()
  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderDetail> {
    return this.orderDetailService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.OrderDetailUpdateInput): Promise<OrderDetail> {
    return this.orderDetailService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<OrderDetail> {
    return this.orderDetailService.remove(+id);
  }
}
