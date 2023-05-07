import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  Req,
} from '@nestjs/common';

import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PaginationParams } from '../shared/dto/pagination-params.dto';
import { LoggedInRequest } from '../shared/interfaces/loggedInRequest';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  async create(
    @Body() createExperienceDto: CreateExperienceDto,
    @Req() request: LoggedInRequest,
  ) {
    try {
      const { _id } = await this.experiencesService.create(
        createExperienceDto,
        request.userId,
      );

      return { _id };
    } catch (error) {
      const { status, message } = error;

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(message, status, { cause: error });
    }
  }

  @Get()
  async findAll(@Query() { offset, limit, sort }: PaginationParams) {
    try {
      return await this.experiencesService.findAll(offset, limit, sort);
    } catch (error) {
      const { status, message } = error;

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(message, status, { cause: error });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.experiencesService.findOne(id);
    } catch (error) {
      const { status, message } = error;

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(message, status, { cause: error });
    }
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
