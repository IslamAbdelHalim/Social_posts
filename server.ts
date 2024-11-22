import express from 'express'
import dotenv from 'dotenv';
import { initDb } from './datastore/dataStore';
import { notFoundErrorHandling, globalErrorHandling } from './middlewares/errorHandling';
import requestLoggerMiddleware from './middlewares/logger';
import router from './routes/index';

(async () => {
  await initDb();

  dotenv.config();

  const app = express();

  app.use(express.json());

  app.use(requestLoggerMiddleware);

  app.use('/v1', router);

  app.use(notFoundErrorHandling);

  app.use(globalErrorHandling);

  app.listen(5000, () => console.log('the server is running on port 5000'));
})();
