import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { createProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  // TODO: Remove Partials and improve selects, you can find the docs here https://www.prisma.io/client
  async create(product: createProductDto) {
    const equivalencies = product.equivalentUnits;
    delete product.equivalentUnits;
    console.log(`equivalencies: ${equivalencies}`);
    console.log(`product: ${product}`);
    return await this.prisma.product.create({
      data: {
        ...product,
        equivalentUnits: {
          createMany: {
            data: equivalencies,
          },
        },
      },
    });
  }

  async createWithDetails(
    productData: Prisma.ProductCreateInput,
    equivalentUnitData: Prisma.EquivalentUnitUncheckedCreateInput[],
  ): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        ...productData,
        equivalentUnits: {
          createMany: {
            data: equivalentUnitData,
          },
        },
      },
    });
  }

  async findAll(productName: string, categoryId: string): Promise<Product[]> {
    const parsedCategoryId =
      categoryId !== 'null' && categoryId !== 'undefined'
        ? parseInt(categoryId)
        : undefined;
    console.log(categoryId, parsedCategoryId);
    return await this.prisma.product.findMany({
      where: {
        name: {
          contains: productName,
          mode: 'insensitive',
        },
        AND: [
          {
            categoryId: parsedCategoryId,
          },
        ],
      },
      include: {
        category: true,
        unit: true,
        equivalentUnits: {
          include: {
            unit: true,
          },
        },
      },
      orderBy: [
        {
          category: {
            name: 'asc',
          },
        },
        {
          name: 'asc',
        },
      ],
    });
  }

  async findOne(id: number): Promise<Product> {
    return await this.prisma.product.findUnique({ where: { id } });
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
        category: true, // Include category
        unit: true, // Include unit
        equivalentUnits: true, // Include equivalent units
      },
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
