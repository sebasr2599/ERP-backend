import { Injectable } from '@nestjs/common';
import { HistoricEquivalent, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HistoricEquivalentService {
  constructor(private prisma: PrismaService) {}

  //create async CRUD functions using prismaservice
  async create(data: Prisma.HistoricEquivalentCreateInput): Promise<HistoricEquivalent> {
    //convert date format from YYYY-MM-DD to YYYY-MM-DDTHH:MM:SSZ (ISO 8601) use the middle of the day
    const date = new Date(data.date);
    date.setHours(24, 0, 0, 0);
    data.date = date;

    return this.prisma.historicEquivalent.create({ data });
  }

  async findAll(): Promise<HistoricEquivalent[]> {
    return this.prisma.historicEquivalent.findMany();
  }

  async findOne(id: number): Promise<HistoricEquivalent> {
    return this.prisma.historicEquivalent.findUnique({ where: { id } });
  }

  async findOneByProductIdAndDate( productId: number, date: Date): Promise<HistoricEquivalent | null> {
    const beginningOfDay = new Date(date);
    beginningOfDay.setHours(19, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(24, 59, 59, 999);

    return this.prisma.historicEquivalent.findFirst({
      where: { productId, date: { gte: beginningOfDay, lte: endOfDay } },
      orderBy: { date: 'desc' },
    });
  }

  async findAllByProductId(productId: number): Promise<HistoricEquivalent[]> {
    return this.prisma.historicEquivalent.findMany({
      where: { productId },
      orderBy: { date: 'desc' },
    });
  }

  async update(
    id: number,
    data: Prisma.HistoricEquivalentUpdateInput,
  ): Promise<HistoricEquivalent> {
    const date = new Date(data.date as Date);
    date.setHours(24, 0, 0, 0);
    data.date = date;

    return this.prisma.historicEquivalent.update({ where: { id }, data });
  }

  async remove(id: number): Promise<HistoricEquivalent> {
    return this.prisma.historicEquivalent.delete({ where: { id } });
  }
}
