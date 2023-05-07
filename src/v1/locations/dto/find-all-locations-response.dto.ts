import { Location } from 'src/v1/database/models/location.entity';

export class FindAllLocationsResponseDto {
  count: number;
  locations: Location[];
}
