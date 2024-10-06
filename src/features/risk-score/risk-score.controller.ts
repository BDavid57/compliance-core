import { Controller } from '@nestjs/common';
import { RiskScoreService } from './risk-score.service';

@Controller('risk-score')
export class RiskScoreController {
  constructor(private readonly riskScoreService: RiskScoreService) {}
}
