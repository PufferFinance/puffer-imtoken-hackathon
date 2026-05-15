import pino from 'pino';

jest.mock('../src/common/lib/environment', () => ({
  env: {
    // Application
    PORT: 8081,
    BASE_URL: '/puffer-backend-service',
    ENVIRONMENT: 'development',
    SERVICE_API_KEY: 'testApiKey',

    // Integrations
    SENTRY_DSN: undefined,
    DATABASE_URL: 'mockDatabaseUrl',

    // Blockchain
    ETH_RPC_URL: 'mockRpcUrl',
  },
}));

// Disable logging.
jest.mock('../src/common/lib/logger', () => ({
  logger: pino({ enabled: false }),
}));
