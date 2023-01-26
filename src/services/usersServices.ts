import userRepository from "@/repository/userRepository";
import { users } from "@prisma/client";
import bcrypt from "bcrypt";

export async function createUser({ email, passwordHash }: CreateUsersParams): Promise<users> {
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

export type CreateUsersParams = Pick<users, "email" | "passwordHash">;

const userService = {
  createUser,
};

export default userService;
