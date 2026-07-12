import { config } from "dotenv";
import "dotenv/config";
import { NotInEnvError } from "../shared/errors/not_in_env.error.js";

config();
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV;

if (!JWT_SECRET) {
  throw new NotInEnvError("SECRET");
}
if (!PORT) {
  throw new NotInEnvError("PORT");
}
if (!DATABASE_URL) {
  throw new NotInEnvError("PORT");
}
if (!NODE_ENV) {
  throw new NotInEnvError("PORT");
}
export const env = { JWT_SECRET, PORT, DATABASE_URL, NODE_ENV } as const;
