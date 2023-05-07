import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { enums } from 'utils';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Experience {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({
    type: String,
    required: true,
  })
  authorId: string;

  @Prop({
    type: String,
    required: true,
    ref: 'Location',
  })
  location: string;

  @Prop({
    type: String,
    required: true,
    maxlength: 100,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    maxlength: 1000,
  })
  description: string;

  @Prop({
    type: Number,
    required: false,
    min: 1,
    max: 999,
    maxlength: 1000,
  })
  timeDuration: number;

  @Prop({
    type: String,
    required: false,
    enum: enums.timeDurationUnit,
    maxlength: 1000,
  })
  timeDurationUnit: string;

  @Prop({
    type: [String],
    required: true,
    maxlength: 500,
  })
  imagesLinks: Array<string>;

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

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
