import { infer as _infer } from 'zod';
import { ToDoSchema, UserSchema } from './schema';

type IUser = _infer<typeof UserSchema>;
type IToDo = _infer<typeof ToDoSchema>;

export { type IUser, type IToDo };
