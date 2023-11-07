import { Test, TestingModule } from '@nestjs/testing';
import { HistoricPriceController } from './historic-price.controller';
import { HistoricPriceService } from './historic-price.service';

describe('HistoricPriceController', () => {
  let controller: HistoricPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricPriceController],
      providers: [HistoricPriceService],
    }).compile();

    controller = module.get<HistoricPriceController>(HistoricPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
