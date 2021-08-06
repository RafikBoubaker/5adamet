import { IsEnum } from 'class-validator';
import { CostAnswerStatus } from '../costanswer.enum';

export class UpdateCostAnswerStatusDto {
  @IsEnum(CostAnswerStatus)
  status: CostAnswerStatus;
}