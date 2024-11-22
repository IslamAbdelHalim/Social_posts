import { RequestHandler} from 'express';
import CustomizeError from '../utils/customizeError';
import { verifyAccessToken } from '../controllers/auth';
import { User } from '../models/types';
import { db } from '../datastore/dataStore';

export const protectRoute: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(new CustomizeError('You are not login', 401));
  }

  try {
    const decode = verifyAccessToken(token);
    const user = await db.getUserById(decode.id);
    if (!user) {
      return next(new CustomizeError('User not exist', 401));
    }

    // @ts-ignore
    req.user = user;
    next();
  } catch (e) {
    return next(new CustomizeError('Bad Token', 401));
  }

}