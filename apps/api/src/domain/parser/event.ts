import { RawEvent } from "../../infrastructure/repositories/eventRepository";
import { Event, eventSchema } from "../entities/event.js";

export const rawEventToEntityEvent = (rawEvent: RawEvent): Event => {
  const parsed = eventSchema.safeParse({
    eventId: rawEvent.event_id,
    title: rawEvent.title,
    place: rawEvent.place,
    url: rawEvent.url,
    address: rawEvent.address,
    startedAt: rawEvent.started_at,
    endedAt: rawEvent.ended_at,
    catch: rawEvent.catch,
    description: rawEvent.description,
    accepted: rawEvent.accepted,
  });
  if (!parsed.success) {
    console.log(JSON.stringify(parsed.error.issues, null, 2))
    throw new Error("Invalid event data");
  }
  return parsed.data;
}
