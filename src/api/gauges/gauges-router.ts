import { Router, Request, Response, NextFunction } from 'express';
import { sendResponse } from '@/common/lib/response';
import { ServerError } from '@/common/error/server-error';
import { bffClient } from '@/clients/bff-client';

const gaugesRouter = Router();

/**
 * @openapi
 * /gauges/apr:
 *   get:
 *     tags:
 *       - Gauges
 *     summary: Get APR for a gauge/opportunity
 *     description: Returns the annual percentage rate for a specific gauge or DeFi opportunity by its contract address.
 *     parameters:
 *       - in: query
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: The gauge or opportunity contract address
 *         example: "0x196ead472583bc1e9af7a05f860d9857e1bd3dcc"
 *     responses:
 *       200:
 *         description: Gauge APR data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apr:
 *                   type: number
 *                   description: Annual percentage rate
 *                   example: 12.5
 *                 identifier:
 *                   type: string
 *                   description: The contract address queried
 *                 name:
 *                   type: string
 *                   description: Human-readable name of the opportunity
 *                   example: "Unifi ETH Vault"
 *                 timestamp:
 *                   type: string
 *       400:
 *         description: Missing identifier parameter
 *       500:
 *         description: Server error
 */
gaugesRouter.get(
  '/apr',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { identifier } = req.query;
      if (!identifier || typeof identifier !== 'string') {
        throw new ServerError(
          400,
          'identifier query parameter is required (contract address)',
        );
      }
      const data = await bffClient.getGaugeApr(identifier);
      return sendResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  },
);

export { gaugesRouter };
