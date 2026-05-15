import { env } from './common/lib/environment';
import { logger } from './common/lib/logger';
import { app } from './server';

const main = () => {
  app.listen(app.get('port'));

  const serverUrl = `http://localhost:${app.get('port')}${env.BASE_URL}`;
  logger.info([`Server: ${serverUrl}`, `Swagger: ${serverUrl}/docs`]);
};

main();
