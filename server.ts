import express from 'express';
import { initDb } from './datastore/dataStore';
import ErrorHandling from './middlewares/errorHandling';
import requestLoggerMiddleware from './middlewares/logger';
import router from './routes/index';

(async () => {
  await initDb();

  const app = express();

  app.use(express.json());

  app.use(requestLoggerMiddleware);

  app.use('/v1', router);

  app.use(ErrorHandling);

  app.listen(5000, () => console.log('the server is running'));
})();
