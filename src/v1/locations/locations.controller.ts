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

import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PaginationParams } from '../shared/dto/pagination-params.dto';
import { LoggedInRequest } from '../shared/interfaces/loggedInRequest';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @Req() request: LoggedInRequest,
  ) {
    try {
      const { _id } = await this.locationsService.create(
        createLocationDto,
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
      return await this.locationsService.findAll(offset, limit, sort);
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
      return await this.locationsService.findOne(id);
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
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
