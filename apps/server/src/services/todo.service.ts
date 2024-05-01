import DB from '../db/index';
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
      let newTask: IToDo | null = null;
      await DB.transaction(async (transaction) => {
        const [insertedTask] = await transaction<IToDo>()
          .insert({
            user_id: userId,
            title: payload.title,
            description: payload.description,
            completed: payload.completed,
          })
          .returning('*');
        newTask = insertedTask;
      });
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
  ): Promise<[IToDo | IToDo[] | null, ServerError | null | unknown]> => {
    try {
      if (id) {
        const task = await DB.select()
          .from<IToDo>('todos')
          .where({ id, user_id: userId })
          .first();
        if (task) {
          return [task, null];
        } else {
          return [null, new ServerError('Task not found.')];
        }
      } else {
        let query = DB.select().from<IToDo>('todos').where({ user_id: userId });
        if (paginationOptions?.page && paginationOptions.pageSize) {
          const { page, pageSize } = paginationOptions;
          const offset = (page - 1) * pageSize;
          query = query.offset(offset).limit(pageSize);
        }
        const userTasks = await query;
        return [userTasks, null];
      }
    } catch (error: unknown) {
      if (error instanceof KnexTimeoutError) {
        return [null, new ServerError(error.message)];
      }
      return [null, error];
    }
  },
  update: async (
    payload: Partial<Pick<IToDo, 'completed' | 'title' | 'description' | 'id'>>,
    userId: number,
  ): Promise<[IToDo | null, ServerError | null | unknown]> => {
    try {
      let task: IToDo | null = null;
      DB.transaction(async (trasaction) => {
        const [updatedTask] = await trasaction<IToDo>('todos').where({
          user_id: userId,
          id: payload.id,
        });
        task = updatedTask;
      });

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
  ): Promise<[number | null, ServerError | unknown]> => {
    try {
      const deleteCount = await DB<IToDo>('todos')
        .where({ id, user_id: userId })
        .delete();
      if (deleteCount > 0) {
        return [deleteCount, null];
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
