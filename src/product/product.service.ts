import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  // TODO: Remove Partials and improve selects, you can find the docs here https://www.prisma.io/client
  async create(product: Prisma.ProductCreateInput) {
    return await this.prisma.product.create({ data: product });
  }

  async findAll(): Promise<Partial<Product>[]> {
    return await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        priceUnit: true,
        priceWholesale: true,
        categoryId: true,
        unitId: true,
        image: true,
      },
    });
  }

  async findOne(id: number): Promise<Partial<Product>> {
    return await this.prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        priceUnit: true,
        priceWholesale: true,
        categoryId: true,
        unitId: true,
        image: true,
      },
    });
  }

  //find by name but name doesnt have to exactly match
  async findByName(name: string): Promise<Partial<Product>[]> {
    return await this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        priceUnit: true,
        priceWholesale: true,
        categoryId: true,
        unitId: true,
        image: true,
      },
    });
  }

  async update(
    id: number,
    product: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: product,
    });
  }

  async remove(id: number): Promise<Product> {
    return await this.prisma.product.delete({ where: { id } });
  }
}
