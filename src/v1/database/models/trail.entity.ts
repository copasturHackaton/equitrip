import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Experience } from './experience.entity';

@Schema()
export class Trail {
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
    required: true,
    maxlength: 100,
    ref: 'Experience',
  })
  experiences: Experience[];

  @Prop({
    type: String,
    required: true,
    maxlength: 100,
  })
  title: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    default: 0,
    max: 9999999999,
  })
  upVotes: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 9999999999,
  })
  downVotes: number;

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

export const TrailSchema = SchemaFactory.createForClass(Trail);