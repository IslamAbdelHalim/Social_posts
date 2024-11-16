import express from 'express';
import ErrorHandling from './middlewares/errorHandling';
import requestLoggerMiddleware from './middlewares/logger';
import router from './routes/index';

const app = express();

app.use(express.json());

app.use(requestLoggerMiddleware);

app.use('/', router);

app.use(ErrorHandling);

app.listen(5000, () => console.log('the server is running'));
