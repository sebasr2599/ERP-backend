import { Module } from '@nestjs/common';
import { HistoricEquivalentService } from './historic-equivalent.service';
import { HistoricEquivalentController } from './historic-equivalent.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [HistoricEquivalentController],
  providers: [HistoricEquivalentService, PrismaService],
  exports: [HistoricEquivalentService],
})
export class HistoricEquivalentModule {}
