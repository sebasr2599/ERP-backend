import { Injectable } from '@nestjs/common';
import { OrderDetail, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderDetailService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.OrderDetailCreateInput): Promise<OrderDetail> {
    return this.prisma.orderDetail.create({ data });
  }

  async findAll(): Promise<OrderDetail[]> {
    return this.prisma.orderDetail.findMany();
  }

  // find all order details by order id including product name and unit name
  // Returns OrderDetail's unit at the top level (unit) and Product's unit nested (product.unit)
  async findallByOrderId(orderId: number): Promise<OrderDetail[]> {
    return this.prisma.orderDetail.findMany({
      where: { orderId },
      include: {
        unit: true, // OrderDetail's unit (the unit used in the order detail)
        product: { include: { unit: true } }, // Product's base unit (for reference)
      },
    });
  }

  async findOne(id: number): Promise<OrderDetail> {
    return this.prisma.orderDetail.findUnique({
      where: { id },
      include: { unit: true },
    });
  }

  async update(
    id: number,
    data: Prisma.OrderDetailUpdateInput,
  ): Promise<OrderDetail> {
    return this.prisma.orderDetail.update({ where: { id }, data });
  }

  async remove(id: number): Promise<OrderDetail> {
    return this.prisma.orderDetail.delete({ where: { id } });
  }
}
