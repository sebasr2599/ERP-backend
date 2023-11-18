import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order, Prisma } from '@prisma/client';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() data: Prisma.OrderCreateInput): Promise<Order> {
    return this.orderService.create(data);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(+id);
  }

  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.orderService.findallByUserId(+userId);
  }

  @Get('date/:date')
  async findAllByDate(@Param('date') date: Date): Promise<Order[]> {
    return this.orderService.findallByDate(date);
  }

  @Get('date/:date/user/:userId')
  async findAllByDateAndUserId(@Param('date') date: Date, @Param('userId') userId: string): Promise<Order[]> {
    return this.orderService.findallByDateAndUserId(date, +userId);
  }

  @Post(':id/release')
  async releaseOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.releaseOrder(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.OrderUpdateInput): Promise<Order> {
    return this.orderService.update(+id, data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Order> {
    return this.orderService.remove(+id);
  }
}
