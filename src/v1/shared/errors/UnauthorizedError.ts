import { HttpStatus } from '@nestjs/common';
import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
  constructor(message: string, cause?: Error) {
    super(message, HttpStatus.UNAUTHORIZED, cause);
  }
}
