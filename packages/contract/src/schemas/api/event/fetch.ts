import { z } from "zod";

export const fetchEventRequestSchema = z.object({
  keyword: z.string().optional(),
  prefecture: z.string(),
  ym: z.string()
});

export const eventSchema = z.object({
  eventId: z.number(),
  title: z.string(),
  catch: z.string(),
  description: z.string(),
  url: z.string(),
  startedAt: z.string(),
  endedAt: z.string(),
  address: z.string(),
  place: z.string(),
  accepted: z.number(),
});

export const fetchEventResponseSchema = z.array(eventSchema);

export type FetchEventRequest = z.infer<typeof fetchEventRequestSchema>;
export type FetchEventResponse = z.infer<typeof fetchEventResponseSchema>;
