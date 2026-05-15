import { Request, Response, NextFunction } from 'express';
import { logger } from '../common/lib/logger';

export const requestLoggingMiddleware = <ResBody = any>(
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => {
  // Create a new response object to capture the response data
  const originalSend = res.send;
  let responseData: ResBody | undefined;

  res.send = function (body?: ResBody) {
    responseData = body;
    return originalSend.call(this, body);
  };

  // Call the next middleware
  next();

  // After the response has been sent, log the response data
  res.on('finish', () => {
    logger.info(
      {
        request: {
          params: req.params,
          body: req.body,
          url: req.originalUrl,
          method: req.method,
        },
        response: responseData,
      },
      'API Response',
    );
  });
};
