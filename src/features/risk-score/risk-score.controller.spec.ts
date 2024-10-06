import { Test, TestingModule } from '@nestjs/testing';
import { RiskScoreController } from './risk-score.controller';
import { RiskScoreService } from './risk-score.service';

describe('RiskScoreController', () => {
  let controller: RiskScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskScoreController],
      providers: [RiskScoreService],
    }).compile();

    controller = module.get<RiskScoreController>(RiskScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
