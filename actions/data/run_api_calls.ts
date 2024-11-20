"use server";
import type { AlertList, EventList } from "./definitions";
import { getAlertsAuth } from "./api_calls/get_alerts";
import { getUnacknowledgedEventsAuth } from "./api_calls/get_unacknowledged_events";
import { getAccessTokenFromSession } from "@/actions/auth/session";

const api_url = process.env.API_URL ?? "";

export async function getAlerts(): Promise<AlertList | null> {
  const access_token = await getAccessTokenFromSession();

  if (!access_token) return null;

  const list_of_alerts = await getAlertsAuth(api_url, access_token);

  return list_of_alerts;
}

export async function getUnacknowledgedEvents(): Promise<EventList | null> {
  const access_token = await getAccessTokenFromSession();

  if (!access_token) return null;

  const list_of_events = await getUnacknowledgedEventsAuth(
    api_url,
    access_token
  );

  return list_of_events;
}
