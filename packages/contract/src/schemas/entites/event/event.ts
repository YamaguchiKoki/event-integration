import { z } from 'zod';

export const eventSourceSchema = z.enum(['connpass', 'doorkeeper']);

export const eventSchema = z.object({
  eventId: z.number(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  imageUrl: z.string(),
  ownerUrl: z.string().describe("connpass->series.url, doorkeeper->event.ownerId をAPI_URL/groups/の後につなげる"),
  startedAt: z.string(),
  endedAt: z.string(),
  address: z.string(),
  place: z.string(),
  accepted: z.number(),
  eventSource: eventSourceSchema,
});

export type Event = z.infer<typeof eventSchema>;
