import { Request, Response } from 'express';
import { hashPassword } from '../utils/hashPassword';
import { createUser } from '../database/repositories/user/createUser';
import { findUserbyTelegramId } from '../database/repositories/user/findUserbyTelegramId';
import { UserType } from '../@types/user';
import { generateUserToken } from '../utils/tokenHandler';

const register = async (req: Request, res: Response) => {
  const { firstName, password, telegramId } = req.body;

  if (!firstName || !telegramId || !password) {
    return res.status(422).json({ message: 'The fields email, firstName, password are required' });
  }

  const existingUser = await findUserbyTelegramId(telegramId);

  if (existingUser?.id) {
    return res.status(409).json({ message: 'User already exists', status: 409 });
  }

  const userInput: UserType = {
    first_name: firstName,
    telegram_id: telegramId,
    password: hashPassword(password),
    role: 'user',
  };

  const newUser = await createUser(userInput);

  if (!newUser.id) {
    return res.status(500).json({ message: 'Failed to create user', status: 500 });
  }

  const token = generateUserToken(newUser);

  return res.status(201).json({
    message: 'User created successfully',
    token,
    code: 201,
    success: true,
  });
};

export { register };
