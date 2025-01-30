import { Event } from "../entities/event";

export interface EventSearchParams {
  keyword?: string;
  prefecture: string;
  ym: string;
}
export interface IEventRepository {
  fetchEvents(params: EventSearchParams): Promise<Event[]>;
}
