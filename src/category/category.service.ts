import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(category: Prisma.CategoryCreateInput) {
    return await this.prisma.category.create({ data: category });
  }

  async findAll(): Promise<Partial<Category>[]> {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findOne(id: number): Promise<Partial<Category>> {
    return await this.prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async update(id: number, category: Prisma.CategoryUpdateInput): Promise<Category> {
    return await this.prisma.category.update({
      where: { id },
      data: category,
    });
  }

  async remove(id: number): Promise<Category> {
    return await this.prisma.category.delete({ where: { id } });
  }
}
