import { ErrorRequestHandler } from 'express';

const ErrorHandling: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'there is error happening' });
};

export default ErrorHandling;
