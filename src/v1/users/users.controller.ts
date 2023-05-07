import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedInRequest } from '../shared/interfaces/loggedInRequest';
import { NotFoundError } from '../shared/errors/NotFoundError';
import { UnauthorizedError } from '../shared/errors/UnauthorizedError';
import { BaseError } from '../shared/errors/BaseError';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const { _id } = await this.usersService.create(createUserDto);
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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      return await this.usersService.findOne(id);
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() request: LoggedInRequest,
    @Res() response: Response,
  ) {
    try {
      const { userId: loggedInUserId } = request;
      await this.usersService.remove(loggedInUserId, id);

      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      const { status, message } = error;

      if (error instanceof BaseError) {
        return response.status(status).send(error);
      }

      const builtError = new BaseError(message, status, error);

      return response.status(builtError.getStatus()).send(builtError);
    }
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: LoginUserDto,
  ) {
    try {
      // TODO: refactor business logic out of controller layer
      const user = await this.usersService.findByEmail(loginUserDto.getEmail());

      if (!user) {
        throw new NotFoundError('User not found');
      }

      const passwordsMatch = await this.authService.comparePasswords(
        loginUserDto.getPassword(),
        user.password,
      );

      if (!passwordsMatch) {
        throw new UnauthorizedError('Invalid credentials');
      }

      const jwtSecretKey = this.configService.get<string>('JWT_SECRET_KEY');
      const jwtExpiresIn = this.configService.get<string>('JWT_EXPIRES_IN');
      const token = jwt.sign(
        {
          userId: user._id,
        },
        jwtSecretKey,
        { expiresIn: jwtExpiresIn },
      );

      const frontEndDomain = this.configService.get<string>('FRONT_END_DOMAIN');
      const cookieExpiresInSeconds = parseInt(
        this.configService.get<string>('COOKIE_EXPIRES_IN_SECONDS'),
        10,
      );

      const cookiesOpts = {
        domain: frontEndDomain,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: cookieExpiresInSeconds,
      };

      response.cookie('token', token, cookiesOpts);

      return {
        token,
      };
    } catch (error) {
      const { status, message } = error;

      if (error instanceof BaseError) {
        return response.status(status).send(error);
      }

      const builtError = new BaseError(message, status, error);

      return response.status(builtError.getStatus()).send(builtError);
    }
  }
}
