import { infer as _infer } from 'zod';
import { SignInSchema } from '@/schema/login.schema';

export type ISignIn = _infer<typeof SignInSchema>;
