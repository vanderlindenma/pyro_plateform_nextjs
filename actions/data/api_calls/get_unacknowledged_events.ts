"use server";
import { z } from "zod";
import { eventListSchema } from "../definitions";
import type { EventList } from "../definitions";

export async function getUnacknowledgedEventsAuth(
  api_url: string,
  access_token: string
): Promise<EventList | null> {
  const res = await fetch(`${api_url}/events/unacknowledged`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  console.log(res);

  if (!res.ok) {
    console.error(`Error fetching unacknowledged events: ${res.statusText}`);
    return null;
  }

  const data = await res.json();
  const parsedData = eventListSchema.safeParse(data);

  if (!parsedData.success) {
    console.error(
      "Invalid data format for list of unacknowledged events:",
      parsedData.error
    );
    return null;
  }

  return parsedData.data;
}
