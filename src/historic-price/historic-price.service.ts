import { Injectable } from '@nestjs/common';
import { HistoricPrice, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HistoricPriceService {
  constructor(private prisma: PrismaService) {}

  //create async CRUD functions using prismaservice
  async create(data: Prisma.HistoricPriceCreateInput): Promise<HistoricPrice> {
    const date = new Date(data.date);
    date.setHours(24, 0, 0, 0);
    data.date = date;
    
    return this.prisma.historicPrice.create({ data });
  }

  async findAll(): Promise<HistoricPrice[]> {
    return this.prisma.historicPrice.findMany();
  }

  async findOne(id: number): Promise<HistoricPrice | null> {
    return this.prisma.historicPrice.findUnique({ where: { id } });
  }

  async findOneByProductIdAndDate( productId: number, date: Date): Promise<HistoricPrice | null> {
    // Set the date to the beginning of the day
    const beginningOfDay = new Date(date);
    beginningOfDay.setHours(19, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(24, 59, 59, 999);

    return this.prisma.historicPrice.findFirst({
      where: { productId, date: { gte: beginningOfDay, lte: endOfDay } },
      orderBy: { date: 'desc' },
    });
  }

  async findAllByProductId(productId: number): Promise<HistoricPrice[]> {
    return this.prisma.historicPrice.findMany({
      where: { productId },
      orderBy: { id: 'desc' },
    });
  }

  async update(
    id: number,
    data: Prisma.HistoricPriceUpdateInput,
  ): Promise<HistoricPrice> {
    const date = new Date(data.date as Date);
    date.setHours(24, 0, 0, 0);
    data.date = date;

    return this.prisma.historicPrice.update({ where: { id }, data });
  }

  async remove(id: number): Promise<HistoricPrice> {
    return this.prisma.historicPrice.delete({ where: { id } });
  }
}
