import { z } from 'zod';

export const eventSchema = z.object({
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

export type Event = z.infer<typeof eventSchema>;
