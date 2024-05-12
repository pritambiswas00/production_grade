import { type Request, type Response } from 'express';
import { InternalServerError } from 'http-errors';
import { UserSchema } from '../validationSchema/schema';
import { BadRequest } from 'http-errors';
import { userService } from '../services/user.service';
import { ServerError } from '../Error/error';
import { generateHashPassword } from '../utils';
import { authService } from '../services/auth.service';
import { type IUser } from '../validationSchema/types';

declare global {
  namespace Express {
    interface Request {
      user?: Pick<IUser, 'id' | 'name' | 'email'>;
    }
  }
}

const authController = {
  signIn: async (
    req: Request,
    res: Response,
  ): Promise<
    Response<
      | typeof BadRequest
      | typeof InternalServerError
      | { message: string; token: string }
    >
  > => {
    try {
      if (req.user === undefined)
        return res.status(400).json(new BadRequest('Please login again.'));
      const [jsonToken, error] = await authService.signIn(req.user);
      if (error)
        return res.status(400).json(new BadRequest("Couln't generate token"));
      return res
        .status(200)
        .json({ message: 'Successfully logged in.', token: jsonToken });
    } catch (error: unknown) {
      return res.status(500).json(new InternalServerError());
    }
  },
  signUp: async (
    req: Request,
    res: Response,
  ): Promise<
    Response<
      typeof BadRequest | typeof InternalServerError | { message: string }
    >
  > => {
    try {
      const body = await UserSchema.omit({
        id: true,
        created_at: true,
        updated_at: true,
        session: true,
      }).safeParseAsync(req.body);
      if (!body.success)
        return res.status(400).json(new BadRequest(body.error.message));
      const hashedPassword = generateHashPassword(body.data.password);
      const [newUser, error] = await userService.create({
        email: body.data.email,
        password: hashedPassword,
        name: body.data.name,
      });
      if (error)
        return res
          .status(400)
          .json(
            new BadRequest(
              error instanceof ServerError
                ? error.errorMessage
                : "Couldn't create new user",
            ),
          );
      return res.status(201).json({ message: `${newUser}. Please log in.` });
    } catch (error: unknown) {
      return res.status(500).json(new InternalServerError());
    }
  },
  signOut: async (
    req: Request,
    res: Response,
  ): Promise<
    Response<typeof BadRequest | typeof InternalServerError | string>
  > => {
    try {
      const user = req.user as Pick<IUser, 'email' | 'id' | 'name'>;

      const [_, error] = await authService.signOut(user);
      if (error)
        return res
          .status(400)
          .json(
            new BadRequest(
              error instanceof ServerError
                ? error.errorMessage
                : "Couldn't Sign Out",
            ),
          );
      req.logout((_) => {});
      return res
        .status(200)
        .json({ message: 'You have successfully sign out.' });
    } catch (error: unknown) {
      return res.status(500).json(new InternalServerError());
    }
  },
};

export { authController };
