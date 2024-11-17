import crypto from 'crypto';
import { RequestHandler } from 'express';

import { db } from '../datastore/dataStore';
import catchError from '../middlewares/catchError';
import { User } from '../models/types';

const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

/**
 * @description Create User
 * @rout /signUp
 * @method POST
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

  res.status(200).json({
    status: 'success',
    message: 'user is created successfully',
  });
});

/**
 * @description Login User
 * @rout /login
 * @method POST
 * @access Public
 */
export const login: RequestHandler = catchError(async (req, res, next) => {
  const { login, password } = req.body;

  if (!login || !password) {
    res.status(403).json({
      message: 'please enter username and password',
    });
  }

  let user =
    (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));

  console.log(user);

  if (!user || user.password !== hashPassword(password)) {
    res.status(403).json({
      message: 'Incorrect username or password',
    });
  }

  res.status(200).json({
    user: {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      username: user?.username,
    },
  });
});
