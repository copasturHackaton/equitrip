import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  private readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  private readonly password: string;

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }
}
