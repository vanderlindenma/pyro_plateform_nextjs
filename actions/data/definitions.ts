import { z } from "zod";

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

const groupedEventSchema = z.object({
  id: z.number(),
  created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  created_at_display: z.string(),
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
  device_id: z.number(),
  alert_id: z.number(),
  device_login: z.string(),
  device_login_display: z.string(),
  device_azimuth: z.number(),
  media_urls: z.array(z.string()),
  localizations: z.array(z.string()),
});

export const groupedEventListSchema = z.array(groupedEventSchema).optional();

type groupedEvent = z.infer<typeof groupedEventSchema>;
export type groupedEventList = z.infer<typeof groupedEventListSchema>;
