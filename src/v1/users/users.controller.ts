import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';

import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { _id } = await this.usersService.create(createUserDto);
    return { _id };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: LoginUserDto,
  ) {
    // TODO: refactor business logic out of controller layer
    const user = await this.usersService.findByEmail(loginUserDto.getEmail());

    // TODO: create custom error to return the right status code and message
    if (!user) {
      throw new Error('Not found');
    }

    const passwordsMatch = await this.authService.comparePasswords(
      loginUserDto.getPassword(),
      user.password,
    );

    // TODO: create custom error to return the right status code and message
    if (!passwordsMatch) {
      throw new Error('Invalid credentials');
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
  }
}
