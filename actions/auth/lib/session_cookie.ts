import "server-only";
import { SignJWT, jwtVerify } from "jose";
import type { SessionPayload } from "./definitions";

const JWT_signin_key = new TextEncoder().encode(process.env.JWT_SIGNING_KEY);

export async function set_expire_and_sign(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("60 sec from now")
    .sign(JWT_signin_key);
}

export async function check_signature(session: string | undefined = "") {
  const { payload } = await jwtVerify(session, JWT_signin_key, {
    algorithms: ["HS256"],
  });
  return payload;
}
