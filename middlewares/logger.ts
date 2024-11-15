import { NextFunction, Request, Response } from 'express';

export default function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.method, req.path, '- body', req.body);
  next();
};
