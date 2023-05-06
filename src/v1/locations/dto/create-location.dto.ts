import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

import { enums } from 'utils';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsUUID()
  private readonly authorId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  private readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  private readonly description: string;

  @IsArray()
  @MaxLength(500, { each: true })
  @IsString({ each: true })
  private readonly imagesLinks: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  private readonly latitude: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  private readonly longitude: number;

  @IsNotEmpty()
  @IsString()
  @Length(9)
  private readonly zipCode: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  private readonly number: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  private readonly mapsLink: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @MaxLength(50, { each: true })
  @IsEnum(enums.accessibility, { each: true })
  private readonly accessibility: Array<enums.accessibility>;
}
