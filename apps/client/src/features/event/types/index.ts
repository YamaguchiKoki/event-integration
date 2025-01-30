import { z } from "zod";

export const eventView = z.object({
  eventId: z.number().describe("イベントID"),
  title: z.string().describe("イベント名"),
  place: z.string(),
  address: z.string(),
  url: z.string(),
  startedAt: z.string(),
  endedAt: z.string(),
  catch: z.string(),
  description: z.string(),
  accepted: z.number(),
});

export type EventView = z.infer<typeof eventView>;
