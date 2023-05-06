import { Location } from 'src/v1/database/models/location.entity';

export class FindAllResponseDto {
  locations: Location[];
  count: number;
}
