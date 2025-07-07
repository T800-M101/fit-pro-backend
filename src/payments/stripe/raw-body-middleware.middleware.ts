import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as rawBody from 'raw-body';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['stripe-signature']) {
      const raw = await rawBody(req);
      req['rawBody'] = raw;
    }
    next();
  };
}

