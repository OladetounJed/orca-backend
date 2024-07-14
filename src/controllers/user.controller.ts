import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { findUserbyTelegramId } from '../database/repositories/user/findUserbyTelegramId';
import { config } from '../config';

export const user = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided or invalid token format' });
  }

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid token format' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

    const user = await findUserbyTelegramId(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
