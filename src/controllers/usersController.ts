import userService from "./../services/usersServices";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function usersPost(req: Request, res: Response) {
  const email = req.body.email;
  const passwordHash = req.body.password;

  try {
    const user = await userService.createUser({ email, passwordHash });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function loginPost(req: Request, res: Response) {
  const email = req.body.email;
  const passwordHash = req.body.passwordHash;

  try {
    const login = await userService.createLogin({ email, passwordHash });
    return res.status(httpStatus.OK).send(login);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}