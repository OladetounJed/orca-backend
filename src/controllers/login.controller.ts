import { Request, Response } from 'express';
import { findUserbyTelegramId } from '../database/repositories/user/findUserbyTelegramId';
import { hashPassword } from '../utils/hashPassword';
import { config } from '../config';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

const validateToken = (token: string): boolean => {
  try {
    jwt.verify(token, config.jwt.secret);
    return true;
  } catch (error) {
    logger.error(error);
    throw new Error('Invalid token');
  }
};

export const login = async (req: Request, res: Response) => {
  const { password, telegramId, token } = req.body;

  if (!telegramId || !password || !token) {
    return res.status(422).json({ message: 'invalid credentials' });
  }

  const existingUser = await findUserbyTelegramId(telegramId);

  if (!existingUser) {
    return res.status(404).json({ message: 'User not found', status: 404, user: null });
  }

  if (existingUser.password !== hashPassword(password)) {
    console.log(hashPassword(password));
    console.log(existingUser.password);
    return res.status(401).json({ message: 'Invalid credentials', status: 401, user: null });
  }

  if (!validateToken(token)) {
    return res.status(401).json({ message: 'Invalid token', status: 401, user: null });
  }

  return res.status(200).json({ user: existingUser });
};
