import { z } from "zod";

export const eventSourceSchema = z.enum(['connpass', 'doorkeeper']);

export const eventView = z.object({
  eventId: z.number().describe("イベントID"),
  title: z.string().describe("イベント名"),
  description: z.string(),
  url: z.string(),
  imageUrl: z.string(),
  ownerUrl: z.string(),
  startedAt: z.string(),
  endedAt: z.string(),
  address: z.string(),
  place: z.string(),
  accepted: z.number(),
  eventSource: eventSourceSchema,
});

export type EventView = z.infer<typeof eventView>;
