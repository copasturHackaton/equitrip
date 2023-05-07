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

import { TrailsService } from './trails.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { PaginationParams } from '../shared/dto/pagination-params.dto';
import { BaseError } from '../shared/errors/BaseError';

@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @Post()
  async create(
    @Body() createTrailDto: CreateTrailDto,
    @Res() response: Response,
  ) {
    try {
      const { _id } = await this.trailsService.create(createTrailDto);
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
      return await this.trailsService.findAll(offset, limit, sort);
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
      return await this.trailsService.findOne(id);
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
  update(@Param('id') id: string, @Body() updateTrailDto: UpdateTrailDto) {
    return this.trailsService.update(+id, updateTrailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trailsService.remove(+id);
  }
}
