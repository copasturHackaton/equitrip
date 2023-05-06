import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Experience } from 'src/v1/shared/dto/experience-priorization.dto';

export class CreateTrailDto {
  @IsNotEmpty()
  @IsUUID()
  private readonly authorId: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => Experience)
  private readonly experiences: Array<Experience>;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  private readonly title: string;

  @IsArray()
  @MaxLength(500, { each: true })
  @IsString({ each: true })
  private readonly imagesLinks: string;

  public getExperiences(): Array<Experience> {
    return this.experiences;
  }
}
