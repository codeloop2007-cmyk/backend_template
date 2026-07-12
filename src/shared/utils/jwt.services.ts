import jwt, {
  type JwtPayload,
  type Secret,
  type SignOptions,
} from "jsonwebtoken";

export function signJwt(
  payload: string | Buffer | object,
  secret: Secret,
  options?: SignOptions,
): string {
  return jwt.sign(payload, secret, options);
}

export function verifyJwt<T extends JwtPayload>(
  token: string,
  secret: Secret,
): T {
  const decoded = jwt.verify(token, secret);

  if (typeof decoded === "string") {
    throw new Error("Expected JWT payload to be an object.");
  }

  return decoded as T;
}
