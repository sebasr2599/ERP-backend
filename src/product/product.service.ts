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

  async createWithDetails(productData: Prisma.ProductCreateInput, equivalentUnitData: Prisma.EquivalentUnitUncheckedCreateInput[]): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        ...productData,
        EquivalentUnit: {
          createMany: {
            data: equivalentUnitData
          }
        }
      }
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    return await this.prisma.product.findUnique({where: { id }});
  }

  //return product with category and unit
  async findOneWithCategoryAndUnit(id: number): Promise<Product> {
    return await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        unit: true,
      },
    });
  }

  async getProductWithDetails(productId: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,        // Include category
        unit: true,            // Include unit
        EquivalentUnit: true   // Include equivalent units
      }
    });
  }

  //find by name but name doesnt have to exactly match
  async findByName(name: string): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      }});
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
