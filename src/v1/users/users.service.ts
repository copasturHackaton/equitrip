import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../database/models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdLocation = new this.userModel(createUserDto);
      return (await createdLocation.save()).toObject();
    } catch (error) {
      console.error(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const foundUser = await this.userModel.findById(id);

    // TODO: create custom error to return the right status code and message
    if (!foundUser) {
      throw new Error('Not found');
    }

    return foundUser.toObject();
  }

  async findByEmail(email: string) {
    const foundEmail = await this.userModel.findOne({ email }, { password: 1 });

    // TODO: create custom error to return the right status code and message
    if (!foundEmail) {
      throw new Error('Not found');
    }

    return foundEmail.toObject();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(loggedInUserId: string, id: string) {
    if (loggedInUserId !== id) {
      throw new Error('Unauthorized');
    }

    await this.userModel.deleteOne({ _id: id });
  }
}
