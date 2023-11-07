import { Module } from '@nestjs/common';
import { EquivalentUnitService } from './equivalent-unit.service';
import { EquivalentUnitController } from './equivalent-unit.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EquivalentUnitController],
  providers: [EquivalentUnitService, PrismaService],
  exports: [EquivalentUnitService],
})
export class EquivalentUnitModule {}
