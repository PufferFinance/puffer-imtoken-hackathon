import { Router, Request, Response, NextFunction } from 'express';
import { sendResponse } from '@/common/lib/response';
import { ServerError } from '@/common/error/server-error';
import { bffClient } from '@/clients/bff-client';

const tokensRouter = Router();

/**
 * @openapi
 * /tokens/prices:
 *   get:
 *     tags:
 *       - Tokens
 *     summary: Get USD prices for tokens
 *     description: Returns current USD prices for the given token contract addresses. Separate multiple addresses with `%`.
 *     parameters:
 *       - in: query
 *         name: addresses
 *         required: true
 *         schema:
 *           type: string
 *         description: Token contract addresses separated by `%`
 *         example: "0xd9a442856c234a39a81a089c06451ebaa4306a72%0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
 *     responses:
 *       200:
 *         description: Token prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: object
 *                 properties:
 *                   usd:
 *                     type: number
 *               example:
 *                 "0xd9a442856c234a39a81a089c06451ebaa4306a72":
 *                   usd: 2650.50
 *                 "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2":
 *                   usd: 2540.25
 *       400:
 *         description: Missing addresses parameter
 *       500:
 *         description: Server error
 */
tokensRouter.get(
  '/prices',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { addresses } = req.query;
      if (!addresses || typeof addresses !== 'string') {
        throw new ServerError(
          400,
          'addresses query parameter is required (token addresses separated by %)',
        );
      }
      const data = await bffClient.getTokenPrices(addresses);
      return sendResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  },
);

export { tokensRouter };
