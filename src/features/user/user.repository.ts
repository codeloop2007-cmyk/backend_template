import { prisma } from "../../configs/prisma.singleton.js";
import type { Prisma } from "../../generated/prisma/client.js";

function findById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data });
}

function updateLastLogin(id: string) {
  return prisma.user.update({
    where: { id },
    data: { lastLoginAt: new Date() },
  });
}

export const userRepository = {
  findById,
  createUser,
  updateLastLogin,
};
