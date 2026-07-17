import type { Prisma } from "../../generated/prisma/client.js";
import { userRepository } from "./user.repository.js";
import type { SyncUserRequest } from "./user.request.js";

async function syncUser(input: SyncUserRequest): Promise<boolean> {
  const { userId } = input;

  const existingUser = await userRepository.findById(userId);
  if (existingUser) {
    await userRepository.updateLastLogin(existingUser.id);
    return true;
  }

  const createData: Prisma.UserCreateInput = {
    id: userId,
    lastLogin: new Date(),
  };

  await userRepository.createUser(createData);
  return true;
}
export const userService = {
  syncUser,
};
