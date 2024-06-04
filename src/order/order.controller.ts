import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order, Prisma } from '@prisma/client';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { createOrderDto } from './dto/createOrderDto.dto';

@UseGuards(JWTAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() data: createOrderDto, @Req() req): Promise<Order> {
    const userId = req.user.id;
    // console.log(userId);
    return this.orderService.create(data, userId);
  }

  @Post('withDetails')
  async createOrderWithDetails(
    @Body()
    createOrderDto: {
      orderData: Prisma.OrderCreateInput;
      orderDetails: Prisma.OrderDetailUncheckedCreateInput[];
    },
  ): Promise<Order> {
    return this.orderService.createOrderWithDetails(
      createOrderDto.orderData,
      createOrderDto.orderDetails,
    );
  }

  @Get()
  async findAll(@Query('recent') recent): Promise<Order[]> {
    return this.orderService.findAll(recent);
  }

  @Get('pending')
  async findAllPending(): Promise<Order[]> {
    return this.orderService.findAllPending();
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
  async findAllByDateAndUserId(
    @Param('date') date: Date,
    @Param('userId') userId: string,
  ): Promise<Order[]> {
    return this.orderService.findallByDateAndUserId(date, +userId);
  }

  @Post(':id/release')
  async releaseOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.releaseOrder(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.OrderUpdateInput,
  ): Promise<Order> {
    return this.orderService.update(+id, data);
  }
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status,
  ): Promise<Order> {
    return this.orderService.updateStatus(+id, status);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Order> {
    return this.orderService.remove(+id);
  }

  // delete an order and its details
  @Delete(':id/details')
  async deleteWithDetails(@Param('id') id: string): Promise<Order> {
    return this.orderService.deleteWithDetails(+id);
  }
}
