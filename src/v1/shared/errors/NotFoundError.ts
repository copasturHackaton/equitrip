import { HttpStatus } from '@nestjs/common';
import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(message: string, cause?: Error) {
    super(message, HttpStatus.NOT_FOUND, cause);
  }
}
