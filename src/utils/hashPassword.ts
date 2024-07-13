import * as crypto from 'crypto';
import { config } from '../config';

export const hashPassword = (password: string) => {
  return crypto.pbkdf2Sync(password, config.sha256Secret, 100, 64, `sha512`).toString(`hex`);
};
