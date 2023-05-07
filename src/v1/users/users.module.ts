import * as bcrypt from 'bcrypt';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../database/models/user.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
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
  providers: [UsersService],
})
export class UserModule {}
