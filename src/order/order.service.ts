import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { createOrderDto } from './dto/createOrderDto.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(data: createOrderDto, userId: number): Promise<Order> {
    const date = new Date(Date.now());
    data.date = date;
    data.userId = userId;
    const orderDetails = data.orderDetails;
    delete data.orderDetails;
    data.clientId === 1 ? (data.status = 'STARTED') : (data.status = 'BLOCKED');
    console.log(data.clientId, data.status);
    return await this.prisma.order.create({
      data: {
        ...data,
        orderDetails: {
          createMany: {
            data: orderDetails,
          },
        },
      },
    });
  }

  // TODO: Get the user id from token and date from server.
  async createOrderWithDetails(
    orderData: Prisma.OrderCreateInput,
    orderDetails: Prisma.OrderDetailUncheckedCreateInput[],
  ): Promise<Order> {
    return this.prisma.$transaction(async (prisma) => {
      // Create the order with nested order details
      const order = await prisma.order.create({
        data: {
          ...orderData,
          orderDetails: {
            create: orderDetails.map((detail) => ({
              productId: detail.productId,
              quantity: detail.quantity,
              price: detail.price,
              unitId: detail.unitId,
              //TODO UPDATE INVENTORY QUANTITY WHEN CREATING ORDER
              // No need to include `order` or `orderId` here as it's handled by the nested write
            })),
          },
        },
      });

      return order;
    });
  }

  async findAll(recent: string): Promise<Order[]> {
    let statusFilter = {};
    const recentStatus = recent === 'true';
    if (recentStatus) {
      statusFilter = {
        status: {
          in: ['PENDING', 'BLOCKED'],
        },
      };
    }
    return this.prisma.order.findMany({
      where: statusFilter,
      include: {
        Client: true,
        user: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async findAllPending(): Promise<Order[]> {
    // find all orders with status 'PENDING' or 'BLOCKED'
    return this.prisma.order.findMany({
      where: {
        OR: [{ status: 'PENDING' }, { status: 'BLOCKED' }],
      },
    });
  }

  async findOne(id: number): Promise<Order> {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        Client: true,
        user: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
        orderDetails: {
          include: {
            product: true,
            unit: true,
          },
        },
      },
    });
  }

  async findallByUserId(userId: number): Promise<Order[]> {
    return this.prisma.order.findMany({ where: { userId } });
  }

  async findallByDate(date: Date): Promise<Order[]> {
    const beginningOfDay = new Date(date);
    beginningOfDay.setHours(19, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(42, 59, 59, 999);

    return this.prisma.order.findMany({
      where: { date: { gte: beginningOfDay, lte: endOfDay } },
      orderBy: { date: 'desc' },
    });
  }

  async findallByDateAndUserId(date: Date, userId: number): Promise<Order[]> {
    const beginningOfDay = new Date(date);
    beginningOfDay.setHours(19, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(42, 59, 59, 999);

    return this.prisma.order.findMany({
      where: { date: { gte: beginningOfDay, lte: endOfDay }, userId },
      orderBy: { date: 'desc' },
    });
  }

  async releaseOrder(id: number): Promise<Order> {
    // Get order details
    const orderDetails = await this.prisma.orderDetail.findMany({
      where: { orderId: id },
    });

    // Update inventory based on order details
    for (const orderDetail of orderDetails) {
      // Find the product and its unit
      const product = await this.prisma.product.findUnique({
        where: { id: orderDetail.productId },
        include: { unit: true },
      });

      if (!product) {
        throw new Error(`Product ID ${orderDetail.productId} not found`);
      }

      // Determine the quantity to subtract, considering unit conversions if necessary
      let quantityToSubtract = orderDetail.quantity;

      if (product.unitId !== orderDetail.unitId) {
        // Find the equivalent unit conversion
        const equivalentUnit = await this.prisma.equivalentUnit.findFirst({
          where: {
            productId: product.id,
            unitId: orderDetail.unitId,
          },
        });

        if (!equivalentUnit) {
          throw new Error(
            `No equivalent unit found for product ID ${orderDetail.productId} and unit ID ${orderDetail.unitId}`,
          );
        }

        // Convert the order detail quantity to the product's unit
        quantityToSubtract *= equivalentUnit.equivalent;
      }

      // Find the inventory record for the specific product
      const inventory = await this.prisma.inventory.findFirst({
        where: { productId: product.id },
      });

      if (!inventory) {
        throw new Error(`Inventory for product ID ${product.id} not found`);
      }

      // Calculate the new quantity
      const newQuantity = inventory.quantity - quantityToSubtract;

      // Update the inventory record
      await this.prisma.inventory.update({
        where: { id: inventory.id },
        data: { quantity: newQuantity },
      });
    }

    // Update the order status to 'RELEASED'
    return this.prisma.order.update({
      where: { id },
      data: { status: 'RELEASED' },
    });
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
  async updateStatus(id: number, status: string): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: { status: status },
    });
  }

  async remove(id: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }
}
