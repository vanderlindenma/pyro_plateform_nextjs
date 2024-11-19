import type { NextRequest } from "next/server";
import { updateSession } from "@/actions/auth/session";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
