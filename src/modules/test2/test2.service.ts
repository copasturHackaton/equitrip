import { Injectable } from '@nestjs/common';
import { CreateTest2Dto } from './dto/create-test2.dto';
import { UpdateTest2Dto } from './dto/update-test2.dto';
import { config } from '../../config';

@Injectable()
export class Test2Service {
  create(createTest2Dto: CreateTest2Dto) {
    return config;
  }

  findAll() {
    return `This action returns all test2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} test2`;
  }

  update(id: number, updateTest2Dto: UpdateTest2Dto) {
    return `This action updates a #${id} test2`;
  }

  remove(id: number) {
    return `This action removes a #${id} test2`;
  }
}
