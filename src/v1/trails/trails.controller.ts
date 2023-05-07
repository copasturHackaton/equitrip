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
  HttpException,
  Req,
} from '@nestjs/common';

import { TrailsService } from './trails.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { PaginationParams } from '../shared/dto/pagination-params.dto';
import { LoggedInRequest } from '../shared/interfaces/loggedInRequest';

@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @Post()
  async create(
    @Body() createTrailDto: CreateTrailDto,
    @Req() request: LoggedInRequest,
  ) {
    try {
      const { _id } = await this.trailsService.create(
        createTrailDto,
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
      return await this.trailsService.findAll(offset, limit, sort);
    } catch (error) {
      const { status, message } = error;

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(message, status, { cause: error });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      return await this.trailsService.findOne(id);
    } catch (error) {
      const { status, message } = error;

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(message, status, { cause: error });
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
