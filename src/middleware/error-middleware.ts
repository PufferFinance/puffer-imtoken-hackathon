import { NextFunction, Request, Response } from 'express';
import { logger } from '@/common/lib/logger';
import { sendResponse } from '@/common/lib/response';
import { ServerError } from '../common/error/server-error';

/**
 * Middleware to handle errors in the application.
 * @param error - The error to handle.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export const errorMiddleware = (
  error: ServerError | Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(error);

  if (error instanceof ServerError) {
    sendResponse(res, error.status, {
      error: error.message || 'An unknown error occurred',
      ...error.responseData,
    });

    return next();
  }

  sendResponse(res, 500, {
    error: error.message || 'An unknown error occurred',
  });

  next(error);
};
