import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseError extends HttpException {
  constructor(
    message: string,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    cause?: Error,
  ) {
    super(message, statusCode, { cause });
  }
}
