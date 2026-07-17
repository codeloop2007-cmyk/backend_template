import { z } from "zod";

export const syncUserRequestSchema = z.object({
  userId: z.string(),
});

export type SyncUserRequest = z.infer<typeof syncUserRequestSchema>;
