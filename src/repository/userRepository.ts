import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.usersSelect) {
  const params: Prisma.usersFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.users.findUnique(params);
}

async function create(data: Prisma.usersUncheckedCreateInput) {
  return prisma.users.create({
    data,
  });
}

async function createSession(data: Prisma.sessionsUncheckedCreateInput) {
  return prisma.sessions.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  create,
  createSession,
};

export default userRepository;