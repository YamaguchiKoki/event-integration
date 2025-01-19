import { Event } from "../../domain/entities/event.js";
import { EventSearchParams, IEventRepository } from "../../domain/repositories/IEventRepository.js";
import { IHttpClient } from "../gateway/http/client.js";

type ConnpassAPIResponse = {
  events: Array<{
    event_id: number;
    title: string;
    place: string;
    address: string;
    started_at: string;
    ended_at: string;
    catch: string;
    description: string;
    accepted: number;
  }>;
};

export const useEventRepository = (
  httpClient: IHttpClient
): IEventRepository => {
  return {
    fetchEvents: async (params: EventSearchParams): Promise<Event[]> => {
      const response = await httpClient.get<ConnpassAPIResponse>('/event', {
        keyword: params.keyword ?? '',
        prefecture: params.prefecture,
        ym: params.startDate.toISOString().slice(0, 7),
        format: 'json',
      });

      return response.events.map(event => ({
        eventId: event.event_id,
        title: event.title,
        place: event.place,
        address: event.address,
        startedAt: new Date(event.started_at),
        endedAt: new Date(event.ended_at),
        catch: event.catch,
        description: event.description,
        participantsCount: event.accepted,
      }));
    },
  };
}
