import { ErrorRequestHandler } from 'express';
import CustomizeError from '../utils/customizeError';

export const notFoundErrorHandling: ErrorRequestHandler = (req, res, next) => {
  console.log('Not Found');
  // @ts-ignore
  next(new CustomizeError(`Can not find ${req.originalUrl} on this server`, 404));
};

export const globalErrorHandling: ErrorRequestHandler = (err, req, res, next) => {
  console.log('not found')
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Server Error';

  sendError(err, res);
}

function sendError(error: any, res: any): void {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  })
}