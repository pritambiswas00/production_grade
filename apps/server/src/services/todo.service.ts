import { DB } from '../db/index';
import { KnexTimeoutError } from 'knex';
import { IToDo } from '../validationSchema/types';
import { ServerError } from '../Error/error';
import { PaginationOptions } from '../types/types';

const toDoService = {
  create: async (
    payload: Pick<IToDo, 'title' | 'description' | 'completed'>,
    userId: number,
  ): Promise<[string | null, ServerError | null | unknown]> => {
    try {
      const newTask = await DB<IToDo>('todos')
        .insert({
          title: payload.title,
          description: payload.description,
          completed: payload.completed,
          user_id: userId,
        })
        .select('*');
      if (newTask) return ['Successfully created new Task', null];
      return [null, new ServerError("Couldn't create new task")];
    } catch (error: unknown) {
      if (error instanceof KnexTimeoutError) {
        return [null, new ServerError(error.message)];
      }
      return [null, error];
    }
  },
  get: async (
    userId: number,
    id?: number,
    paginationOptions?: PaginationOptions,
  ): Promise<
    [
      (
        | Omit<IToDo, 'id' | 'created_at' | 'updated_at' | 'user_id'>
        | Omit<IToDo, 'id' | 'created_at' | 'updated_at' | 'user_id'>[]
        | null
      ),
      ServerError | null | unknown,
    ]
  > => {
    try {
      if (id) {
        const task = await DB.select()
          .from<IToDo>('todos')
          .where({ id, user_id: userId })
          .first()
          .select('*');
        if (task) {
          return [task, null];
        } else {
          return [null, new ServerError('Task not found.')];
        }
      } else {
        let query = DB.select()
          .from<IToDo>('todos')
          .where({ user_id: userId })
          .select('completed', 'description', 'title');
        if (
          paginationOptions?.page !== undefined &&
          paginationOptions?.pageSize !== undefined
        ) {
          const { page, pageSize } = paginationOptions;
          const offset = (page - 1) * pageSize;
          query = query.offset(offset).limit(pageSize);
        }

        const userTasks = await query;
        if (userTasks) return [userTasks, null];
        return [null, new ServerError('Not Found ToDos')];
      }
    } catch (error: unknown) {
      if (error instanceof KnexTimeoutError) {
        return [null, new ServerError(error.message)];
      }
      return [null, error];
    }
  },
  update: async (
    payload: Partial<Pick<IToDo, 'completed' | 'title' | 'description'>>,
    id: number,
    userId: number,
  ): Promise<[IToDo | null, ServerError | null | unknown]> => {
    try {
      let task = await DB<IToDo>('todos')
        .where({ user_id: userId, id: id })
        .update(payload)
        .select('*');

      if (task) {
        return [task, null];
      } else {
        return [null, new ServerError('Task not found.')];
      }
    } catch (error: unknown) {
      if (error instanceof KnexTimeoutError) {
        return [null, new ServerError(error.message)];
      }
      return [null, error];
    }
  },
  delete: async (
    id: number,
    userId: number,
  ): Promise<[string | null, ServerError | unknown]> => {
    try {
      const deleteCount = await DB<IToDo>('todos')
        .where({ id, user_id: userId })
        .delete();
      if (deleteCount > 0) {
        return ['Successfullt deleted the Todo', null];
      } else {
        return [null, new ServerError('Task not found.')];
      }
    } catch (error: unknown) {
      if (error instanceof KnexTimeoutError) {
        return [null, new ServerError(error.message)];
      }
      return [null, error];
    }
  },
};

export { toDoService };
