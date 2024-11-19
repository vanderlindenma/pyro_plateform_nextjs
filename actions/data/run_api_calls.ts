"use server";
import { z } from "zod";
import { alertListSchema } from "./definitions";
import type { alertList } from "./definitions";
import { getAlertsNoAuth } from "./api_calls/get_alerts";
import { getSession } from "@/actions/auth/session";
import { decrypt } from "./utils/encryption";

const api_url = process.env.API_URL ?? "";

export async function getAlerts(): Promise<alertList | null> {
  const access_token = await getAccessTokenFromSession();
  if (!access_token) {
    return null;
  }

  const list_of_alerts = await getAlertsNoAuth(api_url, access_token);

  return list_of_alerts;
}
