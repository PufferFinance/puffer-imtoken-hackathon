import { sendResponse } from '@/common/lib/response';
import { Request, Response, Router } from 'express';

const healthRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
healthRouter.get('/', (_req: Request, res: Response) => {
  return sendResponse(res, 200, { message: 'Service is healthy' });
});

export { healthRouter };
