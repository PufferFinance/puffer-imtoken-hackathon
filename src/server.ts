import './common/lib/sentry-instrument';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { expressErrorHandler } from '@sentry/node';
import { exampleRouter, healthRouter } from './api';
import { env } from './common/lib/environment';
import { logger } from './common/lib/logger';
import { swaggerRouter } from './common/lib/swagger';
import { errorMiddleware } from './middleware/error-middleware';
import { requestLoggingMiddleware } from './middleware/request-logging-middleware';

const app = express();

// Configuration
app.set('port', env.PORT);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS can be configured to only allow whitelisted origins.
app.use(cors());
app.use(helmet());
// Request logging.
app.use(pinoHttp({ logger }));
// Middleware to log the request and response
app.use(requestLoggingMiddleware);

// Create a base router to handle the BASE_URL prefix.
const baseRouter = express.Router();

// Routes without BASE_URL prefix.
baseRouter.use('/health', healthRouter);
baseRouter.use('/example', exampleRouter);

// Swagger UI
baseRouter.use('/docs', swaggerRouter);

// Mount the base router with the BASE_URL prefix.
app.use(env.BASE_URL, baseRouter);

// Error handling middlewares need to be at the end.
// Sentry error handler.
app.use(expressErrorHandler());
// Custom error handler.
app.use(errorMiddleware);

export { app };
