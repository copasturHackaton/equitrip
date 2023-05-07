import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

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
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.getEmail());

    if (!user) {
      throw new Error('Not found');
    }

    const passwordsMatch = await this.authService.comparePasswords(
      loginUserDto.getPassword(),
      user.password,
    );

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

    return {
      token,
    };
  }
}
