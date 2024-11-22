"use server";
import { z } from "zod";
import { eventListSchema } from "../definitions";
import type { EventList } from "../definitions";
import { ExpectedError } from "@/lib/handle_expected_errors";

export async function getUnacknowledgedEventsAuth(
  api_url: string,
  access_token: string
): Promise<EventList> {
  const res = await fetch(`${api_url}/events/unacknowledged`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!res.ok)
    throw new ExpectedError(
      `Error fetching unacknowledged events: ${res.statusText}`
    );

  const data = await res.json();
  const parsedData = eventListSchema.safeParse(data);
  if (!parsedData.success)
    throw new ExpectedError(
      `Invalid data format for list of unacknowledged events: ${parsedData.error}`
    );

  return parsedData.data;
}
