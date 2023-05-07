import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    // TODO: create custom error to return the right status code and message
    if (!token) {
      throw new Error('Missing auth token');
    }

    try {
      const jwtSecretKey = this.configService.get<string>('JWT_SECRET_KEY');
      const decoded: any = jwt.verify(token, jwtSecretKey);

      req['userId'] = decoded.userId;
    } catch (error) {
      // TODO: create custom error to return the right status code and message
      throw new Error('Invalid token');
    }

    next();
  }
}
