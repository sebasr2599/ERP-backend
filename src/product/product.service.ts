import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { createProductDto, updateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  // TODO: Remove Partials and improve selects, you can find the docs here https://www.prisma.io/client
  async create(product: createProductDto) {
    const equivalencies = product.equivalentUnits;
    delete product.equivalentUnits;
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
    console.log(categoryId);
    const parsedCategoryId =
      categoryId !== 'null' &&
      categoryId !== 'undefined' &&
      categoryId !== undefined
        ? parseInt(categoryId)
        : undefined;
    console.log(parsedCategoryId);
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
        // {
        //   category: {
        //     name: 'asc',
        //   },
        // },
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

  async update(id: number, product: updateProductDto): Promise<Product> {
    // console.log(product);
    const equivalencies = product.equivalentUnits;
    delete product.equivalentUnits;
    // console.log(equivalencies);
    for (const equivalency of equivalencies) {
      await this.prisma.equivalentUnit.update({
        where: {
          id: equivalency.id,
        },
        data: {
          equivalent: equivalency.equivalent,
        },
      });
    }
    const updateProduct: Prisma.ProductUpdateInput = {
      ...product,

      equivalentUnits: {},
    };
    return await this.prisma.product.update({
      where: {
        id: id,
      },
      data: updateProduct,
      include: {
        equivalentUnits: true, // Include related entities in the response if needed
      },
    });
  }

  async remove(id: number): Promise<Product> {
    return await this.prisma.product.delete({ where: { id } });
  }
}
