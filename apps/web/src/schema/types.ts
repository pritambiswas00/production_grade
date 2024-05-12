import { infer as _infer } from 'zod';
import { UserSchema } from './user.schema';
import { ToDoSchema } from './todo.schema';

const LoginSchema = UserSchema.pick({ email: true, password: true });
export const CreateToDoSchema = ToDoSchema.omit({
  created_at: true,
  id: true,
  updated_at: true,
  user_id: true,
});
const ReturnToDo = ToDoSchema.omit({ user_id: true });
export const CreateUserSchema = UserSchema.omit({
  created_at: true,
  id: true,
  session: true,
  updated_at: true,
});
const UserDetailsSchema = CreateUserSchema.omit({ password: true });

export type ISignIn = _infer<typeof LoginSchema>;
export type IToDo = _infer<typeof ReturnToDo>;
export type ICreateUser = _infer<typeof CreateUserSchema>;
export type ICreateToDo = _infer<typeof CreateToDoSchema>;
export type IUserDetails = _infer<typeof UserDetailsSchema>;
