import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateTrailDto {
  @IsNotEmpty()
  @IsUUID()
  private readonly authorId: string;

  @IsNotEmpty()
  @IsArray()
  private readonly experiences: Array<string>;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  private readonly title: string;

  @IsArray()
  @MaxLength(500, { each: true })
  @IsString({ each: true })
  private readonly imagesLinks: string;

  public getExperiences(): Array<string> {
    return this.experiences;
  }
}
