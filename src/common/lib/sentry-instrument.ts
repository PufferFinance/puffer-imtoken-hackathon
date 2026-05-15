import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { env } from './environment';

Sentry.init({
  dsn: env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
    // We need this to pass on additional properties from custom errors.
    Sentry.extraErrorDataIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});
