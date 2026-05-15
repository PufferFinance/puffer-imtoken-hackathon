import dotenv from 'dotenv';

// Override makes sure environment variables are loaded from .env file.
dotenv.config({ override: true });

export const env = {
  // Application
  PORT: process.env.PORT ?? 8080,
  BASE_URL: process.env.BASE_URL ?? '/puffer-backend-service',
  ENVIRONMENT: process.env.ENVIRONMENT ?? 'development',
  SERVICE_API_KEY: process.env.SERVICE_API_KEY!,

  // Integrations
  SENTRY_DSN: process.env.SENTRY_DSN,
  DATABASE_URL: process.env.DATABASE_URL!,

  // Blockchain
  ETH_RPC_URL: process.env.ETH_RPC_URL! || 'mockRpcUrl',
} as const;

// Validate all env vars are defined
Object.entries(env).forEach(([key, value]) => {
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
});
