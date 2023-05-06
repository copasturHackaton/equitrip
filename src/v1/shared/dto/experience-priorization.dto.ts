import { IsNumber, Min, Max, IsNotEmpty, IsString } from 'class-validator';

export class Experience {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  order: number;

  @IsNotEmpty()
  @IsString()
  @Max(50)
  experienceId: string;
}
