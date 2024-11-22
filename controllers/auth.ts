import jwt from 'jsonwebtoken';
import crypto from 'crypto';

interface jwtObj {
  id: string;
}

export const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const createAccessToken = (id: string): string => {
  const secret =  getSecretKey();
  return jwt.sign({ id: id }, secret, { expiresIn: '1d' });
}

export const verifyAccessToken = (accessToken: string): jwtObj => {
  return jwt.verify(accessToken, getSecretKey()) as jwtObj;
}

const getSecretKey = (): string => {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    console.log('error on secret key');
    process.exit(1);
  }

  return secret;
}