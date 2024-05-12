import { z } from 'zod';
export const UserSchema = z
  .object({
    id: z.number().positive().describe('Id of the User'),
    name: z.string().describe('Name of the User'),
    email: z
      .string()
      .email({ message: 'Please provide valid email address.' })
      .describe('Email Address of the User'),
    password: z
      .string()
      // .regex(new RegExp(/^[a-zA-Z0-9]+$/), {
      //   message: 'Password must be alphanumeric.',
      // })
      .describe('Password of the User'),
    created_at: z.string().date().describe('Creation time of the User'),
    updated_at: z.string().date('Update time of the User'),
    session: z.string().describe('JWT Token of the user when logged in'),
  })
  .strict();
