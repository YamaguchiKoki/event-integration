import { Event } from "../entities/event";

export interface EventSearchParams {
  keyword?: string;
  prefecture: string;
  startDate: Date;
}
export interface IEventRepository {
  fetchEvents(params: EventSearchParams): Promise<Event[]>;
}
