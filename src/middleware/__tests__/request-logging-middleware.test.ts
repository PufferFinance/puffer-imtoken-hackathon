import express, { Express } from 'express';
import request from 'supertest';
import { logger } from '@/common/lib/logger';
import { requestLoggingMiddleware } from '../request-logging-middleware';

describe('requestLoggingMiddleware', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  });

  it('should log GET request and response', async () => {
    // Given
    const loggerSpy = jest.spyOn(logger, 'info');
    app.get('/log-middleware/:param', requestLoggingMiddleware, (_req, res) => {
      res.send({ message: 'ok' });
    });

    // When
    const response = await request(app).get('/log-middleware/test');

    // Then
    expect(response.status).toBe(200);
    expect(loggerSpy).toHaveBeenCalledWith(
      {
        request: {
          params: { param: 'test' },
          body: undefined,
          url: '/log-middleware/test',
          method: 'GET',
        },
        response: JSON.stringify({ message: 'ok' }),
      },
      'API Response',
    );
  });

  it('should log POST request and response', async () => {
    // Given
    const loggerSpy = jest.spyOn(logger, 'info');
    app.post('/log-middleware', requestLoggingMiddleware, (req, res) => {
      res.send({ message: req.body.testBody });
    });

    // When
    const response = await request(app).post('/log-middleware').send({
      testBody: 'testBody',
    });

    // Then
    expect(response.status).toBe(200);
    expect(loggerSpy).toHaveBeenCalledWith(
      {
        request: {
          body: { testBody: 'testBody' },
          params: {},
          url: '/log-middleware',
          method: 'POST',
        },
        response: JSON.stringify({ message: 'testBody' }),
      },
      'API Response',
    );
  });
});
