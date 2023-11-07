import { Test, TestingModule } from '@nestjs/testing';
import { HistoricPriceService } from './historic-price.service';

describe('HistoricPriceService', () => {
  let service: HistoricPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricPriceService],
    }).compile();

    service = module.get<HistoricPriceService>(HistoricPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
