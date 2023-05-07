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
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedInRequest } from '../shared/interfaces/loggedInRequest';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const { _id } = await this.usersService.create(createUserDto);

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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      const { status, message } = error;

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(message, status, { cause: error });
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

      response.status(HttpStatus.NO_CONTENT);
    } catch (error) {
      const { status, message } = error;

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(message, status, { cause: error });
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
        throw new NotFoundException('User not found');
      }

      const passwordsMatch = await this.authService.comparePasswords(
        loginUserDto.getPassword(),
        user.password,
      );

      if (!passwordsMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const jwtSecretKey = this.configService.get<string>('JWT_SECRET_KEY');
      const jwtExpiresIn = this.configService.get<string>('JWT_EXPIRES_IN');
      const token = jwt.sign(
        {
          userId: user._id,
          gender: user.gender,
          race: user.race,
          disabiltiies: user.disabilities?.join(),
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

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(message, status, { cause: error });
    }
  }
}
