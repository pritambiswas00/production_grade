import { z } from 'zod';
export const ToDoSchema = z.object({
  id: z.number().positive().describe('Id of the ToDo'),
  title: z.string().describe('Title of the ToDo'),
  description: z.string().describe('Description of the ToDo'),
  completed: z.boolean().describe('Status of the ToDo'),
  user_id: z.number().positive().describe('UserId of the User'),
  created_at: z.string().date().describe('Creation time of the ToDo'),
  updated_at: z.string().date().describe('Update time of the ToDo'),
});
