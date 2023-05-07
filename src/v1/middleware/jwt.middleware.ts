import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
      throw new UnauthorizedException('No credentials provided');
    }

    try {
      const jwtSecretKey = this.configService.get<string>('JWT_SECRET_KEY');
      const decoded: any = jwt.verify(token, jwtSecretKey);

      req['userId'] = decoded.userId;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }

    next();
  }
}
