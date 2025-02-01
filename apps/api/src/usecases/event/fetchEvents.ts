
import { Event } from "../../domain/entities/event";
import { rawEventToEntityEvent } from "../../domain/parser/event.js";
import { IEventRepository, EventSearchParams } from "../../domain/repositories/IEventRepository";
import { env } from "@workspace/configs/env.js";
import { generateMockResponse } from "../../mock/event.js";

export const useFetchEventsUseCase = (eventRepository: IEventRepository) => {
  return async (params: EventSearchParams): Promise<Event[]> => {
    // connpass APIは固定IPが必要なのでローカルではモックデータを返す
    if (env.NODE_ENV === 'local') {
      const mockResponse = generateMockResponse(params);
      const parsed = mockResponse.events.map(rawEventToEntityEvent);
      console.log("Yamaguchi", parsed);
      return parsed;
    }
    return await eventRepository.fetchEvents(params);
  };
}
