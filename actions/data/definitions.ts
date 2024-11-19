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
export type alertList = z.infer<typeof alertListSchema>;
