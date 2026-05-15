import { Router } from 'express';
import { ExampleController } from './controllers/example-controller';

const exampleRouter = Router();
const exampleController = new ExampleController();

/**
 * @openapi
 * /example:
 *   get:
 *     tags:
 *       - Example
 *     summary: Example endpoint
 *     responses:
 *       200:
 *         description: Example response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from example!
 */
exampleRouter.get('/', exampleController.getExampleResponse);

export { exampleRouter };
