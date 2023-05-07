import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { enums } from 'utils';

export class CreateExperienceDto {
  @IsNotEmpty()
  @IsUUID()
  private readonly location: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  private readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  private readonly description: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(999)
  private readonly timeDuration: string;

  @IsOptional()
  @IsEnum(enums.timeDurationUnit)
  private readonly timeDurationUnit: enums.timeDurationUnit;

  @IsArray()
  @MaxLength(500, { each: true })
  @IsString({ each: true })
  private readonly imagesLinks: string;

  public getLocation(): string {
    return this.location;
  }
}
