import { Injectable } from '@nestjs/common';
import { Unit, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  async create(unit: Prisma.UnitCreateInput) {
    return await this.prisma.unit.create({ data: unit });
  }

  async findAll(): Promise<Partial<Unit>[]> {
    return await this.prisma.unit.findMany();
  }

  async findOne(id: number): Promise<Partial<Unit>> {
    return await this.prisma.unit.findUnique({ where: { id } });
  }

  async update(id: number, unit: Prisma.UnitUpdateInput): Promise<Unit> {
    return await this.prisma.unit.update({
      where: { id },
      data: unit,
    });
  }

  async remove(id: number): Promise<Unit> {
    return await this.prisma.unit.delete({ where: { id } });
  }
}
