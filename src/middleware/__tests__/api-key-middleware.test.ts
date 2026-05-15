import express, { Express } from 'express';
import request from 'supertest';
import { apiKeyMiddleware } from '../api-key-middleware';
import { errorMiddleware } from '../error-middleware';
import { env } from '@/common/lib/environment';

describe('API Key Middleware', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
  });

  it('should return 401 if the API key is missing', async () => {
    // Given
    app.get('/api-key-middleware', apiKeyMiddleware, (_req, res) => {
      res.send('ok');
    });
    app.use(errorMiddleware);

    // When
    const response = await request(app).get('/api-key-middleware');

    // Then
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Missing or invalid API key' });
  });

  it('should return 401 if the API key is invalid', async () => {
    // Given
    app.get('/api-key-middleware', apiKeyMiddleware, (_req, res) => {
      res.send('ok');
    });
    app.use(errorMiddleware);

    // When
    const response = await request(app)
      .get('/api-key-middleware')
      .set('x-api-key', 'invalidApiKey');

    // Then
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Missing or invalid API key' });
  });

  it('should pass through if the API key is valid', async () => {
    // Given
    app.get('/api-key-middleware', apiKeyMiddleware, (_req, res) => {
      res.send('ok');
    });
    app.use(errorMiddleware);

    // When
    const response = await request(app)
      .get('/api-key-middleware')
      .set('x-api-key', env.SERVICE_API_KEY);

    // Then
    expect(response.status).toBe(200);
    expect(response.text).toBe('ok');
  });
});
