import { z } from "zod";

const alertSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  lat: z.number(),
  lon: z.number(),
  media_id: z.number(),
  event_id: z.number(),
  azimuth: z.number(),
  localization: z.string(),
  device_id: z.number(),
});

export const alertListSchema = z.array(alertSchema).optional();

type Alert = z.infer<typeof alertSchema>;
export type AlertList = z.infer<typeof alertListSchema>;

const eventSchema = z.object({
  id: z.number(),
  created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  lat: z.number(),
  lon: z.number(),
  type: z.string(),
  start_ts: z
    .string()
    .nullable()
    .refine((val) => val === null || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  end_ts: z
    .string()
    .nullable()
    .refine((val) => val === null || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  is_acknowledged: z.boolean(),
  media_url: z.string(),
  localization: z.string(),
  device_id: z.number(),
  alert_id: z.number(),
  device_login: z.string(),
  device_azimuth: z.number(),
});

export const eventListSchema = z.array(eventSchema).optional();

type Event = z.infer<typeof eventSchema>;
export type EventList = z.infer<typeof eventListSchema>;
