import { Test, TestingModule } from '@nestjs/testing';
import { HistoricEquivalentController } from './historic-equivalent.controller';
import { HistoricEquivalentService } from './historic-equivalent.service';

describe('HistoricEquivalentController', () => {
  let controller: HistoricEquivalentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricEquivalentController],
      providers: [HistoricEquivalentService],
    }).compile();

    controller = module.get<HistoricEquivalentController>(HistoricEquivalentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
