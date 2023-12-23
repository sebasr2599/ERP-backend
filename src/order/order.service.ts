import { Injectable } from '@nestjs/common';
import { Order, OrderDetail, Inventory, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  async createOrderWithDetails(orderData: Prisma.OrderCreateInput, orderDetails: Prisma.OrderDetailUncheckedCreateInput[]): Promise<Order> {
    return this.prisma.$transaction(async (prisma) => {
      // Create the order with nested order details
      const order = await prisma.order.create({
        data: {
          ...orderData,
          OrderDetail: {
            create: orderDetails.map(detail => ({
              productId: detail.productId,
              quantity: detail.quantity,
              price: detail.price,
              unitId: detail.unitId
              // No need to include `order` or `orderId` here as it's handled by the nested write
            })),
          },
        },
      });
  
      return order;
    });
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
