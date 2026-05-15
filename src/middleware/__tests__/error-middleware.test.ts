import express, { Express } from 'express';
import request from 'supertest';
import { errorMiddleware } from '../error-middleware';
import { ServerError } from '@/common/error/server-error';

describe('errorMiddleware', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
  });

  it('should respond with error when an error is thrown', async () => {
    // Given
    app.get('/error-middleware', () => {
      throw new Error('mockError');
    });
    app.use(errorMiddleware);

    // When
    const response = await request(app).get('/error-middleware');

    // Then
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'mockError' });
  });

  it('should include error info when a custom error is thrown', async () => {
    // Given
    app.get('/error-middleware', () => {
      throw new ServerError(502, 'customErrorMessage', {
        sampleData: 'sampleData',
      });
    });
    app.use(errorMiddleware);

    // When
    const response = await request(app).get('/error-middleware');

    // Then
    expect(response.status).toBe(502);
    expect(response.body).toEqual({
      error: 'customErrorMessage',
      sampleData: 'sampleData',
    });
  });

  it.each([new Error(), new ServerError(500, '')])(
    'should fallback to default message if no error data is given',
    async (error) => {
      // Given
      app.get('/error-middleware', () => {
        throw error;
      });
      app.use(errorMiddleware);

      // When
      const response = await request(app).get('/error-middleware');

      // Then
      expect(response.body).toEqual({ error: 'An unknown error occurred' });
    },
  );
});
