import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { enums } from 'utils';

export class UpdateTrailDto {
  @IsNotEmpty()
  @IsEnum(enums.voteActions)
  private readonly action: string;

  @IsNotEmpty()
  @IsEnum(enums.genders)
  private readonly gender: string;

  @IsNotEmpty()
  @IsEnum(enums.races)
  private readonly race: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(enums.disabilities, { each: true })
  private readonly disabilities: string[];
}
