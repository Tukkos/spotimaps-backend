import userRepository from "./../repository/userRepository";
import { exclude } from "./../utils/prisma-utils";
import { users } from "./../../node_modules/.prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function createUser({ email, passwordHash }: CreateUsersParams): Promise<users> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(passwordHash, 12);
  return userRepository.create({
    email,
    passwordHash: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    return "There is already an user with given email";
  }
}

async function createLogin(params: SignInParams): Promise<SignInResult> {
  const { email, passwordHash } = params;

  const user = await getUserOrFail(email);
  await validatePasswordOrFail(passwordHash, user.passwordHash);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "passwordHash"),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, passwordHash: true });
  if (!user) return;

  return user;
}

async function validatePasswordOrFail(passwordHash: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(passwordHash, userPassword);
  if (!isPasswordValid) return;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await userRepository.createSession({
    token,
    userId,
  });

  return token;
}

export type CreateUsersParams = Pick<users, "email" | "passwordHash">;
export type SignInParams = Pick<users, "email" | "passwordHash">;
type GetUserOrFailResult = Pick<users, "id" | "email" | "passwordHash">;

type SignInResult = {
  user: Pick<users, "id" | "email">;
  token: string;
};

const userService = {
  createUser,
  createLogin,
};

export default userService;
