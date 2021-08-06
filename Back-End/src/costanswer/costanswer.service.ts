import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CostAnswer } from './costanswer.entity';
import { CostAnswerStatus } from './costanswer.enum';
import { CostAnswerRepository } from './costanswer.repository';
import { CreateCostAnswerDto } from './dto/costanswer.dto';

@Injectable()
export class CostAnswerService {
  constructor(
    @InjectRepository(CostAnswerRepository)
    private costanswerRepository: CostAnswerRepository,
  ) {}




  async getCostAnswers() : Promise<CostAnswer[]>{
    return await this.costanswerRepository.getCostAnswers();

  }

  async getCostAnswer(answerId: number): Promise<CostAnswer> {
    const answer = await this.costanswerRepository.findOne({
      where: { id: answerId },
    });
    if (!answer) {
      throw new NotFoundException(
        `Product with id: ${answerId} is not found `,
      );
    }
    return answer;
  }

  async getCostAnswerBysp(spName: string): Promise<CostAnswer[]> {
    const service = await this.costanswerRepository.find({
      where: { spname: spName },
    });
    if (!service) {
      throw new NotFoundException(
        `Product with this category: ${spName} is not found `,
      );
    }
    return service;
  }

  async createCostAnswer(createCostAnswerDto: CreateCostAnswerDto): Promise<CostAnswer> {
    return this.costanswerRepository.createCostAnswer(createCostAnswerDto);
  }

  async deleteCostAnswer(id: number): Promise<void> {
    const costanswer = await this.getCostAnswer(id);
    const result = await this.costanswerRepository.delete(costanswer);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with id: ${id} is not found `);
    }
  }
 

  async updateCostAnswerStatus(
    id: number,
    status: CostAnswerStatus,
   
  ): Promise<CostAnswer> {
    const answer = await this.getCostAnswer(id);

    answer.status = status;
    await this.costanswerRepository.save(answer);

    return answer;
  }
  
}

