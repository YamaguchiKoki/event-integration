import { z } from "zod";

export const fetchEventRequestSchema = z.object({
  keyword: z.string().optional(),
  prefecture: z.string(),
  startDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .transform((date) => new Date(date))
});

const eventSchema = z.object({
  eventId: z.number(),
  title: z.string(),
  place: z.string(),
  address: z.string().optional(),
  startedAt: z.date(),
  endedAt: z.date(),
  catch: z.string(),
  description: z.string(),
  participantsCount: z.number(),
});

export const fetchEventResponseSchema = z.array(eventSchema);

export type FetchEventRequest = z.infer<typeof fetchEventRequestSchema>;
export type FetchEventResponse = z.infer<typeof fetchEventResponseSchema>;
