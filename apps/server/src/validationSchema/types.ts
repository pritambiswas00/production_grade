import { infer as _infer } from 'zod';
import { ToDoPaginationParams, ToDoSchema, UserSchema } from './schema';

type IUser = _infer<typeof UserSchema>;
type IToDo = _infer<typeof ToDoSchema>;
type IToDoQuery = _infer<typeof ToDoPaginationParams>;

export { type IUser, type IToDo };
