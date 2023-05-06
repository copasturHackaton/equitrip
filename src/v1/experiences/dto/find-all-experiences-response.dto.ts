import { Experience } from 'src/v1/database/models/experience.entity';

export class FindAllExperiencesResponseDto {
  count: number;
  experiences: Experience[];
}
