import { RequestHandler } from 'express';

import { db } from '../datastore/dataStore';
import catchError from '../middlewares/catchError';
import { User } from '../models/types';
import { createAccessToken, hashPassword } from './auth';
import CustomizeError from '../utils/customizeError';


/**
 * @description Create User
 * @rout /signUp
 * @method post
 * @access Public
 */
export const signUP: RequestHandler = catchError(async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;

  const pass = hashPassword(password);

  const user: User = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    email,
    username,
    password: pass,
  };

  await db.createUser(user);

  const token = createAccessToken(user.id);

  res.status(200).json({
    status: 'success',
    message: 'user is created successfully',
    token,
  });
});

/**
 * @description Login User
 * @rout /login
 * @method post
 * @access Public
 */
export const login: RequestHandler = catchError(async (req, res, next) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return next(new CustomizeError('Please Provide User and password', 400));
  }

  let user =
    (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));

  if (!user || user.password !== hashPassword(password)) {
    return next(new CustomizeError('Incorrect Username or password', 400));
  }

  const token = createAccessToken(user.id);

  res.status(200).json({
    user: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      username: user?.username,
    },
    token
  });
});
