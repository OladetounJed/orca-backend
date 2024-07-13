import { ObjectId } from 'mongoose';

export type UserRole = 'user' | 'admin';

export type UserType = {
  _id?: ObjectId;
  telegram_id: string;
  full_name: string;
  role: UserRole;
  password: string;
};
