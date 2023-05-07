import { IsArray, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { enums } from 'utils';

export class UserVoteTrailDto {
  @IsNotEmpty()
  @IsUUID()
  private readonly userId: string;

  @IsNotEmpty()
  @IsUUID()
  private readonly trailId: string;

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
  private readonly disabilities: Array<string>;

  public getTrailId() {
    return this.trailId;
  }

  public getAction() {
    return this.action;
  }
}
