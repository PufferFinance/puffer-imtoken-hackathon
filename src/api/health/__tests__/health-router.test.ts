import request from 'supertest';
import { app } from '@/server';
import { env } from '@/common/lib/environment';

describe('GET /health', () => {
  it('should return response when service is healthy', async () => {
    const response = await request(app).get(`${env.BASE_URL}/health`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Service is healthy' });
  });
});
