import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';

import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PaginationParams } from '../shared/dto/pagination-params.dto';
import { BaseError } from '../shared/errors/BaseError';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  async create(
    @Body() createExperienceDto: CreateExperienceDto,
    @Res() response: Response,
  ) {
    try {
      const { _id } = await this.experiencesService.create(createExperienceDto);
      return { _id };
    } catch (error) {
      const { status, message } = error;

      if (error instanceof BaseError) {
        return response.status(status).send(error);
      }

      const builtError = new BaseError(message, status, error);

      return response.status(builtError.getStatus()).send(builtError);
    }
  }

  @Get()
  async findAll(
    @Query() { offset, limit, sort }: PaginationParams,
    @Res() response: Response,
  ) {
    try {
      return await this.experiencesService.findAll(offset, limit, sort);
    } catch (error) {
      const { status, message } = error;

      if (error instanceof BaseError) {
        return response.status(status).send(error);
      }

      const builtError = new BaseError(message, status, error);

      return response.status(builtError.getStatus()).send(builtError);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      return await this.experiencesService.findOne(id);
    } catch (error) {
      const { status, message } = error;

      if (error instanceof BaseError) {
        return response.status(status).send(error);
      }

      const builtError = new BaseError(message, status, error);

      return response.status(builtError.getStatus()).send(builtError);
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
