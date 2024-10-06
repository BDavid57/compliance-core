import { Test, TestingModule } from '@nestjs/testing';
import { RiskScoreService } from './risk-score.service';

describe('RiskScoreService', () => {
  let service: RiskScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskScoreService],
    }).compile();

    service = module.get<RiskScoreService>(RiskScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
