import { Response } from 'express';
import { ApiResponse } from '../model/api-response';
import { logger } from './logger';

export const sendResponse = <T, E = undefined>(
  response: Response,
  status: number,
  apiResponse: ApiResponse<T, E>,
) => {
  logger.info({ status, response: apiResponse }, 'Sending response');
  response.status(status).send(apiResponse);
};
