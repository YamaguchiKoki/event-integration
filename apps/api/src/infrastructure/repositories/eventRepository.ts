import { Event, eventSchema } from "../../domain/entities/event.js";
import { rawEventToEntityEvent } from "../../domain/parser/event.js";
import { EventSearchParams, IEventRepository } from "../../domain/repositories/IEventRepository.js";
import { IHttpClient } from "../gateway/http/client.js";

type EventSeries = {
  id: number;
  subdomain: string;
  title: string;
  url: string;
};

export type RawEvent = {
  id: number;
  event_id: number;
  title: string;
  catch: string;
  description: string;
  url: string;
  event_url: string;
  image_url: string;
  hash_tag: string;
  started_at: string; // ISO 8601形式の日時
  ended_at: string;   // ISO 8601形式の日時
  limit: number;
  event_type: string;
  open_status: string;
  series: EventSeries;
  address: string;
  place: string;
  lat: string;
  lon: string;
  owner_id: number;
  owner_nickname: string;
  owner_display_name: string;
  accepted: number;
  waiting: number;
  updated_at: string; // ISO 8601形式の日時
};

export type ConnpassApiResponse = {
  results_returned: number;
  results_available: number;
  results_start: number;
  events: RawEvent[];
};


export const useEventRepository = (
  httpClient: IHttpClient
): IEventRepository => {
  return {
    fetchEvents: async (params: EventSearchParams): Promise<Event[]> => {
      try {
        const response = await httpClient.get<ConnpassApiResponse>('/event', {
          keyword: params.keyword ?? '',
          prefecture: params.prefecture,
          ym: params.ym,
          format: 'json',
        });

        const events = response.events.map(rawEventToEntityEvent);

        return events;
      } catch(error) {
        console.error(error);
        throw error;
      }
    },

  };
}
