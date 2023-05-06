import { IsNumber, Min, IsOptional, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { enums } from 'utils';
import { sortOptions } from 'utils/enums';

export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsEnum(enums.sortOptions)
  sort?: sortOptions;
}
