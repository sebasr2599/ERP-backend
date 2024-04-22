import { Injectable } from '@nestjs/common';
import { EquivalentUnit, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EquivalentUnitService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.EquivalentUnitCreateInput,
  ): Promise<EquivalentUnit> {
    return await this.prisma.equivalentUnit.create({
      data,
    });
  }

  async findAll(): Promise<Partial<EquivalentUnit>[]> {
    return await this.prisma.equivalentUnit.findMany();
  }

  async findOne(id: number): Promise<Partial<EquivalentUnit>> {
    return await this.prisma.equivalentUnit.findUnique({ where: { id } });
  }

  async findAllByProductId(
    productId: number,
  ): Promise<Partial<EquivalentUnit>[]> {
    return await this.prisma.equivalentUnit.findMany({ where: { productId } });
  }

  async update(
    id: number,
    data: Prisma.EquivalentUnitUpdateInput,
  ): Promise<EquivalentUnit> {
    return await this.prisma.equivalentUnit.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<EquivalentUnit> {
    return await this.prisma.equivalentUnit.delete({
      where: { id },
    });
  }
}
