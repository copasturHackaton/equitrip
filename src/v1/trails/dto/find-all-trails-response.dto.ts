import { Trail } from 'src/v1/database/models/trail.entity';

export class FindAllTrailsResponseDto {
  count: number;
  trails: Trail[];
}
