import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Location } from '../database/models/location.entity';
import { sortOptions } from 'utils/enums';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { FindAllLocationsResponseDto } from './dto/find-all-locations-response.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    try {
      const createdLocation = new this.locationModel(createLocationDto);
      return (await createdLocation.save()).toObject();
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(
    offset = 0,
    limit = 10,
    sort?: sortOptions,
  ): Promise<FindAllLocationsResponseDto> {
    const locationsQuery = this.locationModel.find().skip(offset).limit(limit);

    if (sort) {
      locationsQuery.sort({ updatedAt: sort });
    }

    const locations = await locationsQuery.lean().exec();
    const count = await this.locationModel.countDocuments();

    return {
      count,
      locations,
    };
  }

  async findOne(id: string) {
    const foundLocation = await this.locationModel.findOne({ _id: id });

    // TODO: create custom error to return the right status code and message
    if (!foundLocation) {
      throw new Error('Not found');
    }

    return foundLocation.toObject();
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
