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

import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PaginationParams } from '../shared/dto/pagination-params.dto';
import { BaseError } from '../shared/errors/BaseError';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @Res() response: Response,
  ) {
    try {
      const { _id } = await this.locationsService.create(createLocationDto);
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
      return await this.locationsService.findAll(offset, limit, sort);
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
      return await this.locationsService.findOne(id);
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
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
