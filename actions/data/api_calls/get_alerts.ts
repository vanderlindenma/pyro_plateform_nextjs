"use server";
import { z } from "zod";
import { alertListSchema } from "../definitions";
import type { alertList } from "../definitions";

export async function getAlertsNoAuth(
  api_url: string,
  access_token: string
): Promise<alertList | null> {
  const res = await fetch(`${api_url}/alerts/`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    console.error(`Error fetching alerts: ${res.statusText}`);
    return null;
  }

  const data = await res.json();
  const parsedData = alertListSchema.safeParse(data);

  if (!parsedData.success) {
    console.error("Invalid data format for list of alerts:", parsedData.error);
    return null;
  }

  return parsedData.data;
}
