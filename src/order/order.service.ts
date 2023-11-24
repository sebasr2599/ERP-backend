import { Injectable } from '@nestjs/common';
import { Order, OrderDetail, Inventory, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  // create order with order details
  async createWithDetails(data: Prisma.OrderCreateInput, orderDetails: Prisma.OrderDetailCreateInput[]): Promise<Order> {
    const order = await this.prisma.order.create({ data });
    orderDetails.forEach(async (orderDetail: Prisma.OrderDetailCreateInput) => {
      await this.prisma.orderDetail.create({ data: { ...orderDetail} as Prisma.OrderDetailCreateInput });
    });
    return order;
    //expample of json received by this method

    // {
    //   "data": {
    //     "date": "2021-10-01T00:00:00.000Z",
    //     "status": "PENDING",
    //     "userId": 1,
    //     "orderDetails": [
    //       {
    //         "productId": 1,
    //         "quantity": 1
    //       },
    //       {
    //         "productId": 2,
    //         "quantity": 1

  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async findOne(id: number): Promise<Order> {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async findallByUserId(userId: number): Promise<Order[]> {
    return this.prisma.order.findMany({ where: { userId } });
  }

  async findallByDate(date: Date): Promise<Order[]> {
    const beginningOfDay = new Date(date);
    beginningOfDay.setHours(19, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(42, 59, 59, 999);

    return this.prisma.order.findMany({ where: { date: { gte: beginningOfDay, lte: endOfDay } },
      orderBy: { date: 'desc' },});
  }

  async findallByDateAndUserId(date: Date, userId: number): Promise<Order[]> {
    const beginningOfDay = new Date(date);
    beginningOfDay.setHours(19, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(42, 59, 59, 999);

    return this.prisma.order.findMany({ where: { date: { gte: beginningOfDay, lte: endOfDay }, userId },
      orderBy: { date: 'desc' },});
  }

  async releaseOrder(id: number): Promise<Order> {
    // Get order details
    const orderDetails = await this.prisma.orderDetail.findMany({ where: { orderId: id } });
    // Update inventory based on order details
    orderDetails.forEach(async (orderDetail) => {
      const inventory = await this.prisma.inventory.findUnique({ where: { id: orderDetail.productId } });
      const newQuantity = inventory.quantity - orderDetail.quantity;
      await this.prisma.inventory.update({ where: { id: orderDetail.productId }, data: { quantity: newQuantity } });
    });
    return this.prisma.order.update({ where: { id }, data: { status: 'RELEASED' } });
  } 

  //create an async function to delete and order and its details
  async deleteWithDetails(id: number): Promise<Order> {
    //delete order details
    await this.prisma.orderDetail.deleteMany({ where: { orderId: id } });
    //delete order
    return this.prisma.order.delete({ where: { id } });
  }

  async update(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
    return this.prisma.order.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }
}
