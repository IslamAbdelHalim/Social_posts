import { RequestHandler } from 'express';

export default function catchError(fn: Function): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
