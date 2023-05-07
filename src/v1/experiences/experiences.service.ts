import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Location } from '../database/models/location.entity';
import { Experience } from '../database/models/experience.entity';
import { sortOptions } from 'utils/enums';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { FindAllExperiencesResponseDto } from './dto/find-all-experiences-response.dto';
import { NotFoundError } from '../shared/errors/NotFoundError';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @InjectModel(Experience.name) private experienceModel: Model<Experience>,
  ) {}

  async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    const locationExists = await this.locationModel.findOne({
      _id: createExperienceDto.getLocation(),
    });

    if (!locationExists) {
      throw new NotFoundError('Location not found');
    }

    const createdLocation = new this.experienceModel(createExperienceDto);
    return (await createdLocation.save()).toObject();
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

    if (!foundExperience) {
      throw new NotFoundError('Experience not found');
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
