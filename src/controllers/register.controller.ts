import { Request, Response } from 'express';
import { hashPassword } from '../utils/hashPassword';
import { createUser } from '../database/repositories/user/createUser';
import { findUserbyTelegramId } from '../database/repositories/user/findUserbyTelegramId';
import { generateUserToken } from '../utils/getUserToken';
import { UserType } from '../@types/user';

const register = async (req: Request, res: Response) => {
  const { fullName, password, telegramId } = req.body;

  if (!fullName || !telegramId || !password) {
    return res.status(422).json({ message: 'The fields email, fullName, password and role are required' });
  }

  const existingUser = await findUserbyTelegramId(telegramId);

  if (existingUser?.id) {
    return res.status(409).json({ message: 'User already exists', status: 409 });
  }

  const userInput: UserType = {
    full_name: fullName,
    telegram_id: telegramId,
    password: hashPassword(password),
    role: 'user',
  };

  const newUser = await createUser(userInput);

  if (!newUser.id) {
    return res.status(500).json({ message: 'Failed to create user', status: 500 });
  }

  return res.status(201).json({
    message: 'User created successfully',
    token: generateUserToken(newUser),
    code: 201,
    success: true,
  });
};

export { register };
