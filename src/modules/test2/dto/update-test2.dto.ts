import { PartialType } from '@nestjs/swagger';
import { CreateTest2Dto } from './create-test2.dto';

export class UpdateTest2Dto extends PartialType(CreateTest2Dto) {}
