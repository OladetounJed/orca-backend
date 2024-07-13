import { Request, Response } from 'express';
import { getSessionData } from '../services/user/userSessionHandler';

export const session = async (req: Request, res: Response) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(422).json({ message: 'sessionId is required' });
  }

  const sessionData = await getSessionData(sessionId.toString());

  return res.status(200).json({ sessionData });
};
