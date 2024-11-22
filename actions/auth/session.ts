"use server";
import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { encryptToJson } from "@/lib/encryption";
import { apiRequestAccessToken } from "./lib/request_access_token";
import { set_expire_and_sign, check_signature } from "./lib/session_cookie";
import type {
  FormState,
  ApiAccessTokenResponse,
  SessionPayload,
} from "./lib/definitions";
import {
  LoginFormSchema,
  ApiAccessTokenResponseSchema,
} from "./lib/definitions";
import { redirect } from "next/navigation";
import { decryptFromJson } from "@/lib/encryption";
import { ExpectedError } from "@/lib/handle_expected_errors";

const cookie_encryption_key = Buffer.from(
  process.env.COOKIE_ENCRYPTION_KEY ?? "",
  "hex"
);

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const errorMessage = { message: "Invalid login credentials." };

  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Query the API for an access token given user's submitted credentials
  const res = await apiRequestAccessToken({
    username: validatedFields.data.username,
    password: validatedFields.data.password,
  });

  // If api authentification fails, return early
  if (!res.ok) {
    console.error("API authentication failed:", res.statusText);
    return errorMessage;
  }

  const api_token = await res.json();
  const validatedApiToken = ApiAccessTokenResponseSchema.safeParse(api_token);

  // If the api token is invalid, return early
  if (!validatedApiToken.success) {
    console.error(
      "Invalid access token received from API:",
      validatedApiToken.error
    );
    return errorMessage;
  }

  // 3. If login is successful, encrypt the user's password and api token and store in session

  const encrypted_password = await encryptToJson({
    message: validatedFields.data.password,
    encryption_key: cookie_encryption_key,
  });

  const encrypted_api_token = await encryptToJson({
    message: validatedApiToken.data.access_token,
    encryption_key: cookie_encryption_key,
  });

  const user = {
    username: validatedFields.data.username,
    encrypted_password: encrypted_password,
    encrypted_api_token: encrypted_api_token,
  };
  const expires = new Date(Date.now() + 10 * 1000);

  const session = await set_expire_and_sign({ user, expires });

  // Save the session in a cookie
  (await cookies()).set("session", session, { expires, httpOnly: true });

  redirect("/dashboard");
}

export async function logout() {
  // Destroy the session
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession(): Promise<SessionPayload> {
  const session = (await cookies()).get("session")?.value;
  if (!session) throw new ExpectedError("No session found");
  const checked_signature = await check_signature(session);
  return checked_signature;
}

export async function getAccessTokenFromSession(): Promise<string> {
  const session = await getSession();

  const decryptedToken = await decryptFromJson({
    encrypted_json: session.user.encrypted_api_token,
    encryption_key: cookie_encryption_key,
  });

  return decryptedToken;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await check_signature(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await set_expire_and_sign(parsed),
    httpOnly: true,
    expires: parsed.expires as Date,
  });
  return res;
}
