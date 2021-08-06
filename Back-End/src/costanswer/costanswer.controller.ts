import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CostAnswer } from './costanswer.entity';
import { CostAnswerService } from './costanswer.service';
import { CreateCostAnswerDto } from './dto/costanswer.dto';
import { UpdateCostAnswerStatusDto } from './dto/update-costanswer-status.dto';

@Controller('costanwsers')
export class CostAnswerController {
  constructor(private costAnswerService: CostAnswerService) {}

  @Get('getanswers')
  getCostAnswers(
  
  ): Promise<CostAnswer[]> {
    return this.costAnswerService.getCostAnswers();
  }

  @Get('getanswers/:id')
  getCostAnswer(@Param('id', ParseIntPipe) costId) {
    return this.costAnswerService.getCostAnswer(costId);
  }

  @Post('createanswer')
  @UsePipes(new ValidationPipe({ transform: true }))
  createCostAnswer( @Body() createCostAnswerDto: CreateCostAnswerDto 
 
   ) :Promise<CostAnswer>  {

     return this.costAnswerService.createCostAnswer(createCostAnswerDto);

  }

  @Delete('/delete/:id')
  deleteCostAnswer(@Param('id',ParseIntPipe) id : number): Promise<any> {
    console.log(id)
    return this.costAnswerService.deleteCostAnswer(id);
  }

  @Patch('/:id/status')
  updateCostAnswerStatus(
    @Param('id') id: number,
    @Body() updateCostAnswerStatusDto: UpdateCostAnswerStatusDto,
  ): Promise<CostAnswer> {
    const { status } = updateCostAnswerStatusDto;
    return this.costAnswerService.updateCostAnswerStatus(id, status);
  }

}
