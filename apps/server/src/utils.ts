import { randomBytes, pbkdf2Sync } from 'crypto';

export const generateHashPassword = (password: string): string => {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${hash}:${salt}`;
};

export const verifyPassword = (password: string, hashedPassword: string) => {
  const [hash, salt] = hashedPassword.split(':');
  const verifyHash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString(
    'hex',
  );
  return hash === verifyHash;
};
