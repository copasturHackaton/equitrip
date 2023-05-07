import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Location } from '../database/models/location.entity';
import { Experience } from '../database/models/experience.entity';
import { sortOptions } from 'utils/enums';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { FindAllExperiencesResponseDto } from './dto/find-all-experiences-response.dto';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @InjectModel(Experience.name) private experienceModel: Model<Experience>,
  ) {}

  async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    try {
      const locationExists = await this.locationModel.findOne({
        _id: createExperienceDto.getLocation(),
      });

      // TODO: create custom error to return the right status code and message
      if (!locationExists) {
        throw new Error('Location not found');
      }

      const createdLocation = new this.experienceModel(createExperienceDto);
      return (await createdLocation.save()).toObject();
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(
    offset = 0,
    limit = 10,
    sort?: sortOptions,
  ): Promise<FindAllExperiencesResponseDto> {
    const experiencesQuery = this.experienceModel
      .find()
      .populate('location')
      .skip(offset)
      .limit(limit);

    if (sort) {
      experiencesQuery.sort({ updatedAt: sort });
    }

    const experiences = await experiencesQuery.lean().exec();
    const count = await this.experienceModel.countDocuments();

    return {
      count,
      experiences,
    };
  }

  async findOne(id: string) {
    const foundExperience = await this.experienceModel
      .findById(id)
      .populate('location');

    // TODO: create custom error to return the right status code and message
    if (!foundExperience) {
      throw new Error('Not found');
    }

    return foundExperience.toObject();
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return `This action updates a #${id} experience`;
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }
}
