import { Module } from '@nestjs/common';
import { HistoricPriceService } from './historic-price.service';
import { HistoricPriceController } from './historic-price.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [HistoricPriceController],
  providers: [HistoricPriceService, PrismaService],
  exports: [HistoricPriceService],
})
export class HistoricPriceModule {}
