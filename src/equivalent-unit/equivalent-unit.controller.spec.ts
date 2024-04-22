import { Test, TestingModule } from '@nestjs/testing';
import { EquivalentUnitController } from './equivalent-unit.controller';
import { EquivalentUnitService } from './equivalent-unit.service';

describe('EquivalentUnitController', () => {
  let controller: EquivalentUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquivalentUnitController],
      providers: [EquivalentUnitService],
    }).compile();

    controller = module.get<EquivalentUnitController>(EquivalentUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
