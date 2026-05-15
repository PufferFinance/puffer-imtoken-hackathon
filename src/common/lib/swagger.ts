import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './environment';

const swaggerRouter = Router();

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation using Swagger/OpenAPI 3.0',
    },
    servers: [
      {
        url: env.BASE_URL,
        description: 'Server Base URL',
      },
    ],
  },
  apis: ['./src/api/**/*.ts'],
});

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerSpec));

export { swaggerRouter };
