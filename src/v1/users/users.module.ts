import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../database/models/user.entity';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        // TODO: refactor to another function
        useFactory: async () => {
          const schema = UserSchema;

          schema.pre('save', async function () {
            if (this.isModified('password')) {
              const hashedPassword = await bcrypt.hash(this.password, 12);
              this.password = hashedPassword;
            }
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [AuthService, ConfigService, UsersService],
})
export class UserModule {}
