import { ServerError } from '@/common/error/server-error';
import { env } from '@/common/lib/environment';
import { NextFunction, Request, Response } from 'express';

export const apiKeyMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers?.['x-api-key'];

  if (apiKey !== env.SERVICE_API_KEY) {
    throw new ServerError(401, 'Missing or invalid API key');
  }

  next();
};
