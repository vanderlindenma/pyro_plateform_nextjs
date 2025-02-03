import { z } from "zod";
import { groupedEventListSchema, groupedEventSchema } from "@/actions/data/definitions";

export const DashboardContextSchema = z.object({
  data: groupedEventListSchema,
  selectedEventId: z.number(),
  setSelectedEventId: z.function().args(z.number()),
  selectedEvent: groupedEventSchema,
  setSelectedEvent: z.function().args(groupedEventSchema),
  imageId: z.number(),
  setImageId: z.function().args(z.number()),
  showPrediction: z.boolean(),
  setShowPrediction: z.function().args(z.boolean()),
  isPlaying: z.boolean(),
  setIsPlaying: z.function().args(z.boolean())
});
export type DashboardContextType = z.infer<typeof DashboardContextSchema>;
