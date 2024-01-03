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

  async findallByOrderId(orderId: number): Promise<OrderDetail[]> {
    return this.prisma.orderDetail.findMany({ where: { orderId } });
  }

  async findOne(id: number): Promise<OrderDetail> {
    return this.prisma.orderDetail.findUnique({ where: { id } });
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
