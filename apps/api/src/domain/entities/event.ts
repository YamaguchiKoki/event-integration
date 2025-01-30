import { z } from 'zod';

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

export type Event = z.infer<typeof eventSchema>;
