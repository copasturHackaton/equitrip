import { Request } from 'express';

export interface LoggedInRequest extends Request {
  userId: string;
}
