import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { enums } from 'utils';

export class UserVoteTrailDto {
  @IsNotEmpty()
  @IsUUID()
  private readonly trailId: string;

  @IsNotEmpty()
  @IsEnum(enums.voteActions)
  private readonly action: string;

  public getTrailId() {
    return this.trailId;
  }

  public getAction() {
    return this.action;
  }
}
