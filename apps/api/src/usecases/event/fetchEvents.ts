import { Event } from "../../domain/entities/event";
import { IEventRepository, EventSearchParams } from "../../domain/repositories/IEventRepository";

export const useFetchEventsUseCase = (eventRepository: IEventRepository) => {
  return async (params: EventSearchParams): Promise<Event[]> => {
    return await eventRepository.fetchEvents(params);
  };
}
