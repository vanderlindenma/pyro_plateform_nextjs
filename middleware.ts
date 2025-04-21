import type { NextRequest } from "next/server";
import { updateSession } from "@/actions/auth/session";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Bypass authentication
  return NextResponse.next();
  // return await updateSession(request);
}
