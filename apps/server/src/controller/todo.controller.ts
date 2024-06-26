import { type Request, type Response } from 'express';
import { InternalServerError, BadRequest } from 'http-errors';
import {
  IDExtractorSchema,
  ToDoPaginationParams,
  ToDoSchema,
} from '../validationSchema/schema';
import { toDoService } from '../services/todo.service';
import { ServerError } from '../Error/error';
import { type IToDo } from '../validationSchema/types';

const toDoController = {
  //Checked
  createToDo: async (
    req: Request,
    res: Response,
  ): Promise<
    Response<typeof BadRequest | typeof InternalServerError | string>
  > => {
    try {
      const payload = await ToDoSchema.omit({
        id: true,
        user_id: true,
        created_at: true,
        updated_at: true,
      }).safeParseAsync(req.body);
      if (!payload.success)
        return res
          .status(400)
          .json(new BadRequest(payload.error.flatten().formErrors[0]));
      const userId: number = 1;
      const [message, error] = await toDoService.create(payload.data, userId);
      if (error)
        return res
          .status(400)
          .json(
            new BadRequest(
              error instanceof ServerError
                ? error.errorMessage
                : "Couldn't create ToDo",
            ),
          );
      return res.status(201).json({ message });
    } catch (error: unknown) {
      return res.status(500).json(new InternalServerError());
    }
  },
  getToDo: async (req: Request, res: Response) => {
    try {
      // const userId: string = Bumber(req.user?.id);
      const isQueryExist = await ToDoPaginationParams.safeParseAsync(req.query);
      if (!isQueryExist.success)
        return res
          .status(400)
          .json(new BadRequest(isQueryExist.error.flatten().formErrors[0]));

      const [todo, error] = await toDoService.get(
        Number(req.user?.id),
        isQueryExist.data.id,
        undefined,
      );
      if (error)
        return res
          .status(400)
          .json(
            new BadRequest(
              error instanceof ServerError
                ? error.errorMessage
                : "Couldn't find Todo",
            ),
          );
      return res.status(200).json({ data: todo });
    } catch (error: unknown) {
      return res.status(500).json(new InternalServerError());
    }
  },
  //Checked
  getAllToDo: async (req: Request, res: Response) => {
    try {
      console.log(req.user, 'User');
      const isQueryExist = await ToDoPaginationParams.safeParseAsync(req.query);
      if (!isQueryExist.success)
        return res
          .status(400)
          .json(new BadRequest(isQueryExist.error.flatten().formErrors[0]));
      console.log(req.user?.id);
      const [todos, error] = await toDoService.get(
        Number(req.user?.id),
        undefined,
        {
          page: isQueryExist.data.page,
          pageSize: isQueryExist.data.pageSize,
        },
      );
      if (error)
        return res
          .status(400)
          .json(
            new BadRequest(
              error instanceof ServerError
                ? error.errorMessage
                : "Couldn't find Todos",
            ),
          );
      return res.status(200).json({ data: todos });
    } catch (error: unknown) {
      return res.status(500).json(new InternalServerError());
    }
  },

  updateToDo: async (
    req: Request,
    res: Response,
  ): Promise<
    Response<typeof BadRequest | typeof InternalServerError | IToDo>
  > => {
    try {
      const params = await IDExtractorSchema('id').safeParseAsync(req.params);
      console.log(params, 'Params');
      if (!params.success)
        return res
          .status(400)
          .json(new BadRequest(params.error.flatten().formErrors[0]));
      const body = await ToDoSchema.omit({
        created_at: true,
        updated_at: true,
        user_id: true,
        id: true,
      })
        .partial({
          title: true,
          description: true,
          completed: true,
        })
        .safeParseAsync(req.body);
      console.log(body, 'BODY');
      if (!body.success)
        return res
          .status(400)
          .json(new BadRequest(body.error.flatten().formErrors[0]));
      const [updated, error] = await toDoService.update(
        body.data,
        Number(params.data.id),
        Number(req.user?.id),
      );
      if (error)
        return res
          .status(400)
          .json(
            new BadRequest(
              error instanceof ServerError
                ? error.errorMessage
                : "Couldn't update the Todo",
            ),
          );
      return res.status(200).json({ data: updated });
    } catch (error: unknown) {
      return res.status(500).json(new InternalServerError());
    }
  },
  deleteToDo: async (
    req: Request,
    res: Response,
  ): Promise<
    Response<typeof BadRequest | typeof InternalServerError | string>
  > => {
    try {
      const params = await IDExtractorSchema('id').safeParseAsync(req.params);
      if (!params.success)
        return res
          .status(400)
          .json(new BadRequest(params.error.flatten().formErrors[0]));
      const [deletedTodo, error] = await toDoService.delete(
        Number(params.data.id),
        Number(req.user?.id),
      );
      if (error)
        return res
          .status(400)
          .json(
            new BadRequest(
              error instanceof ServerError
                ? error.errorMessage
                : "Couldn't find the todo",
            ),
          );
      return res
        .status(200)
        .json({ message: 'Successfully deleted the todo.' });
    } catch (error: unknown) {
      return res.status(500).json(new InternalServerError());
    }
  },
};

export { toDoController };
