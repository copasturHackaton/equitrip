import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PaginationParams } from '../shared/dto/pagination-params.dto';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto) {
    const { _id } = await this.experiencesService.create(createExperienceDto);
    return { _id };
  }

  @Get()
  async findAll(@Query() { offset, limit, sort }: PaginationParams) {
    return await this.experiencesService.findAll(offset, limit, sort);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.experiencesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experiencesService.update(+id, updateExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(+id);
  }
}
