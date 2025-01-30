import { EventView, eventView } from "@/features/event/types";
import { client } from "@/lib/client";

/**
 * 開催開始時刻が今日~nヶ月後までの兵庫県でやっているイベントを取得する
 * @returns
 */
export async function getEvents(): Promise<EventView[]> {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const dateString = `${year}${month}`;

  const res = await client.api.events.$get({ query: { prefecture: 'hyogo', ym: dateString } });
  console.log(res);
  const events = await res.json();

  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parsedEvents = events.events.map(event => {
    const parsedEvent = eventView.parse(event);
    return {
      eventId: parsedEvent.eventId,
      title: parsedEvent.title,
      catch: parsedEvent.catch,
      description: parsedEvent.description,
      url: parsedEvent.url,
      startedAt: formatDate(parsedEvent.startedAt),
      endedAt: formatDate(parsedEvent.endedAt),
      address: parsedEvent.address,
      place: parsedEvent.place,
      accepted: parsedEvent.accepted,
    };
  });

  return parsedEvents;
}
