import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsDateOnlyString } from 'src/v1/shared/decorators';
import { enums } from 'utils';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  private readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  private readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  private readonly password: string;

  @IsNotEmpty()
  @IsDateOnlyString()
  private readonly birthday: string;

  @IsNotEmpty()
  @IsEnum(enums.races)
  private readonly race: string;

  @IsNotEmpty()
  @IsEnum(enums.genders)
  private readonly gender: string;
}
