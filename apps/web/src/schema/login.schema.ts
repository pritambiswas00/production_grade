import { z } from 'zod';

const SignInSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Please provide a valid email address.' }),
    password: z
      .string()
      .regex(new RegExp(/^[a-zA-Z0-9]+$/), {
        message: 'Password must be alphanumeric.',
      })
      .max(12, { message: 'Max length is 12' }),
  })
  .strict();

export { SignInSchema };
