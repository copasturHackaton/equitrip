import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { enums } from 'utils';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Location {
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
    maxlength: 100,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    maxlength: 1000,
  })
  description: string;

  @Prop({
    type: [String],
    required: true,
    maxlength: 500,
  })
  imagesLinks: Array<string>;

  @Prop({
    type: String,
    required: true,
    maxlength: 11,
  })
  latitude: string;

  @Prop({
    type: String,
    required: true,
    maxlength: 11,
  })
  longitude: string;

  @Prop({
    type: String,
    required: true,
    minlength: 9,
    maxlength: 9,
  })
  zipCode: string;

  @Prop({
    type: String,
    required: true,
    maxlength: 20,
  })
  number: string;

  @Prop({
    type: String,
    required: true,
  })
  mapsLink: string;

  @Prop({
    type: [String],
    required: true,
    maxlength: 10,
  })
  accessibility: Array<enums.accessibility>;

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

export const LocationSchema = SchemaFactory.createForClass(Location);
