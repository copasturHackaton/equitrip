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
import { TrailsService } from './trails.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { PaginationParams } from '../shared/dto/pagination-params.dto';

@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @Post()
  async create(@Body() createTrailDto: CreateTrailDto) {
    const { _id } = await this.trailsService.create(createTrailDto);
    return { _id };
  }

  @Get()
  async findAll(@Query() { offset, limit, sort }: PaginationParams) {
    return await this.trailsService.findAll(offset, limit, sort);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.trailsService.findOne(id);
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
