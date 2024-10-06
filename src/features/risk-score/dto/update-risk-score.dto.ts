import { PartialType } from '@nestjs/mapped-types';
import { CreateRiskScoreDto } from './create-risk-score.dto';

export class UpdateRiskScoreDto extends PartialType(CreateRiskScoreDto) {}
