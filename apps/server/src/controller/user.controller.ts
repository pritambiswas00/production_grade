import { type Response, type Request } from 'express';
import { BadRequest, InternalServerError } from 'http-errors';
import { userService } from '../services/user.service';
import { UserSchema } from '../validationSchema/schema';
import { ServerError } from '../Error/error';
import { IUser } from '../validationSchema/types';

const userController = {
  getUser: async (
    req: Request,
    res: Response,
  ): Promise<
    Response<
      | typeof BadRequest
      | typeof InternalServerError
      | Pick<IUser, 'email' | 'name'>
      | null
    >
  > => {
    try {
      const [user, error] = await userService.get(Number(req.user?.id));
      if (error)
        return res
          .status(400)
          .json(
            new BadRequest(
              error instanceof ServerError
                ? error.errorMessage
                : "Couldn't create User",
            ),
          );
      return res.status(200).json({ data: user });
    } catch (error: unknown) {
      return res.status(500).json(new InternalServerError());
    }
  },
  updateUser: async (
    req: Request,
    res: Response,
  ): Promise<
    Response<typeof BadRequest | typeof InternalServerError | string | null>
  > => {
    try {
      const payload = await UserSchema.partial({
        email: true,
        name: true,
        password: true,
      })
        .omit({ created_at: true, id: true, updated_at: true })
        .safeParseAsync(req.body);
      if (!payload.success)
        return res
          .status(400)
          .json(new BadRequest(payload.error.flatten().formErrors[0]));
      const [updated, error] = await userService.update(
        payload.data,
        Number(req.user?.id),
      );
      if (error)
        return res
          .status(400)
          .json(
            new BadRequest(
              error instanceof ServerError
                ? error.errorMessage
                : "Couln't update the User",
            ),
          );
      return res.status(200).json({ message: updated });
    } catch (error: unknown) {
      return res.status(500).json(new InternalServerError());
    }
  },
  deleteUser: async (
    req: Request,
    res: Response,
  ): Promise<
    Response<typeof BadRequest | typeof InternalServerError | string | null>
  > => {
    try {
      const userId: number = 1;
      const [deleted, error] = await userService.delete(Number(req.user?.id));
      if (error)
        return res
          .status(400)
          .json(
            new BadRequest(
              error instanceof ServerError
                ? error.errorMessage
                : "Couldn't deleted the User",
            ),
          );
      return res.status(200).json({ message: deleted });
    } catch (error: unknown) {
      return res.status(500).json(new InternalServerError());
    }
  },
};

export { userController };
