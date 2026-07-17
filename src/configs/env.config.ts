import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string().min(32),
  PORT: z.coerce.number().int().min(1).max(65535),
  DATABASE_URL: z.url(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

export const env = envSchema.parse({
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
});
