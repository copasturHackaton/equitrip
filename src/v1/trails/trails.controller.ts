import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpException,
  Req,
  NotFoundException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { TrailsService } from './trails.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { PaginationParams } from '../shared/dto/pagination-params.dto';
import { LoggedInRequest } from '../shared/interfaces/loggedInRequest';
import { UserVoteTrailDto } from '../users/dto/user-vote-trail.dto';
import { enums } from 'utils';
import { response } from 'express';

@Controller()
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @Post('trails')
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

  @Get('trails')
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

  @Get('trails/:id')
  async findOne(@Param('id') id: string) {
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

  @Post('users/votes/trails')
  async voteTrail(
    @Body() userVoteTrailDto: UserVoteTrailDto,
    @Req() request: LoggedInRequest,
    @Res() response: Response,
  ) {
    try {
      // TODO: refactor business logic out of controller layer
      const trailFound = await this.trailsService.findOne(
        userVoteTrailDto.getTrailId(),
      );

      if (!trailFound) {
        throw new NotFoundException('User not found');
      }

      const action = userVoteTrailDto.getAction();

      const update = {
        $inc: {
          upVotes: action === enums.voteActions.UPVOTE ? 1 : 0,
          downVotes: action === enums.voteActions.DOWNVOTE ? 1 : 0,
        },
        $push: {
          votesPerGroup: {
            type: action,
            gender: request.gender,
            race: request.race,
            disabilities: request.disabilties,
          },
        },
      } as any;

      await this.trailsService.update(trailFound._id, update);

      response.status(HttpStatus.NO_CONTENT);
    } catch (error) {
      const { status, message } = error;

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(message, status, { cause: error });
    }
  }
}
