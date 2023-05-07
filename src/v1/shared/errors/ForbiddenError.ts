import { HttpStatus } from '@nestjs/common';
import { BaseError } from './BaseError';

export class ForbiddenError extends BaseError {
  constructor(message: string, cause?: Error) {
    super(message, HttpStatus.FORBIDDEN, cause);
  }
}
