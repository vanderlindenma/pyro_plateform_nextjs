"use server";
import { getUnacknowledgedEventsAuth } from "./api_calls/get_unacknowledged_events";
import { getAccessTokenFromSession } from "@/actions/auth/session";
import { groupEvents } from "./data_processing/process_api_results";
import type { groupedEventList } from "./definitions";

const api_url = process.env.API_URL ?? "";

export async function getUnacknowledgedEvents(): Promise<groupedEventList> {
  const access_token = await getAccessTokenFromSession();
  const list_of_events = await getUnacknowledgedEventsAuth(
    api_url,
    access_token
  );
  const processed_list_of_events = groupEvents(list_of_events);

  return processed_list_of_events;
}
