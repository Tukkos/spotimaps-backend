import { Router } from "express";

import { usersPost } from "@/controllers";
import { validateBody } from "@/middlewares/validationMiddlewares";
import { signUpSchema } from "@/schemas";

const usersRouter = Router();

usersRouter.post("/", validateBody(signUpSchema), usersPost);

export { usersRouter };