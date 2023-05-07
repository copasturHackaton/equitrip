import { Request } from 'express';
import { enums } from 'utils';

export interface LoggedInRequest extends Request {
  userId: string;
  race: enums.races;
  gender: enums.genders;
  disabilties: Array<enums.disabilities>;
}
