import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { enums } from 'utils';
import { disabilities } from 'utils/enums';

@Schema()
export class User {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    type: Date,
    required: true,
    maxlength: 100,
  })
  birthday: string;

  @Prop({
    type: String,
    required: true,
    enum: enums.races,
    maxlength: 1000,
  })
  race: string;

  @Prop({
    type: String,
    required: false,
    default: enums.genders.GENDERLESS,
    enum: enums.genders,
  })
  gender: string;

  @Prop({
    type: Array,
    required: false,
  })
  disabilities: Array<string>;

  @Prop({
    type: Date,
    default: new Date().toISOString(),
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: new Date().toISOString(),
  })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
