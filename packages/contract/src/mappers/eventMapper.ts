import { eventSchema, Event } from "../schemas/entites/event/event";
import { RawEvent } from "../schemas/entites/event/connpass";
import { DoorkeeperEvent } from "../schemas/entites/event/doorkeeper";

export const conpassEventToEntityEvent = (rawEvent: RawEvent): Event => {
  const parsed = eventSchema.safeParse({
    eventId: rawEvent.event_id,
    title: rawEvent.title,
    description: rawEvent.description,
    url: rawEvent.url,
    imageUrl: rawEvent.image_url,
    ownerUrl: rawEvent.series.url,
    startedAt: rawEvent.started_at,
    endedAt: rawEvent.ended_at,
    address: rawEvent.address,
    place: rawEvent.place,
    accepted: rawEvent.accepted,
    eventSource: 'connpass',
  });
  if (!parsed.success) {
    console.log(JSON.stringify(parsed.error.issues, null, 2))
    throw new Error("Invalid event data");
  }
  return parsed.data;
}

// 主催者URLが別エンドポイントで提供されるリソースであるため、この変換には2回のAPI呼び出しが必要
export const doorkeeperEventToEntityEvent = (
  rawEvent: DoorkeeperEvent,
  groupPublicUrlMap: Map<string, string>
): Event => {
  const groupId = String(rawEvent.group);
  const ownerUrl = groupId ? groupPublicUrlMap.get(groupId) : undefined; // `groupId` がある場合のみ `public_url` をセット

  const parsed = eventSchema.safeParse({
    eventId: rawEvent.id,
    title: rawEvent.title,
    description: rawEvent.description,
    url: rawEvent.public_url,
    imageUrl: rawEvent.banner,
    ownerUrl, // `apiurl/groups/{group}` から取得した `public_url`
    startedAt: rawEvent.starts_at,
    endedAt: rawEvent.ends_at,
    address: rawEvent.address,
    place: rawEvent.venue_name,
    accepted: rawEvent.participants,
    eventSource: "doorkeeper",
  });

  if (!parsed.success) {
    console.log(JSON.stringify(parsed.error.issues, null, 2));
    throw new Error("Invalid event data");
  }

  return parsed.data;
};
