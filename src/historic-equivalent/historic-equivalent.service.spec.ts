import { Test, TestingModule } from '@nestjs/testing';
import { HistoricEquivalentService } from './historic-equivalent.service';

describe('HistoricEquivalentService', () => {
  let service: HistoricEquivalentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricEquivalentService],
    }).compile();

    service = module.get<HistoricEquivalentService>(HistoricEquivalentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
