import { Test, TestingModule } from '@nestjs/testing';
import { EquivalentUnitService } from './equivalent-unit.service';

describe('EquivalentUnitService', () => {
  let service: EquivalentUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquivalentUnitService],
    }).compile();

    service = module.get<EquivalentUnitService>(EquivalentUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
