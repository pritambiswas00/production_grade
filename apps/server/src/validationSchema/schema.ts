import { z } from 'zod';

export const UserSchema = z
  .object({
    id: z.number().positive().describe('Id of the User'),
    name: z.string().describe('Name of the User'),
    email: z
      .string()
      .email({ message: 'Please provide valid email address.' })
      .describe('Email Address of the User'),
    password: z.string().describe('Password of the User'),
    created_at: z.string().date().describe('Creation time of the User'),
    updated_at: z.string().date('Update time of the User'),
  })
  .strict();

export const ToDoSchema = z.object({
  id: z.number().positive().describe('Id of the ToDo'),
  title: z.string().describe('Title of the ToDo'),
  description: z.string().describe('Description of the ToDo'),
  completed: z.boolean().describe('Status of the ToDo'),
  user_id: z.number().positive().describe('UserId of the User'),
  created_at: z.string().date().describe('Creation time of the ToDo'),
  updated_at: z.string().date().describe('Update time of the ToDo'),
});

export const ToDoPaginationParams = z.object({
  page: z
    .string()
    .transform((c) => Number(c))
    .optional()
    .describe('Current Page of the Todo'),
  pageSize: z
    .string()
    .transform((c) => Number(c))
    .optional()
    .describe('List of todo available'),
  id: z
    .string()
    .transform((c) => Number(c))
    .optional()
    .describe('Id of the Todo'),
});

export const IDExtractorSchema = <T extends string>(key: T) => {
  return z.object({
    [key]: z.string(),
  });
};
