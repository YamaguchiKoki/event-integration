
import { IEventRepository } from "../../domain/repositories/IEventRepository";
import { env } from "@workspace/configs/env.js";
import { generateMockResponse } from "../../mock/event.js";
import { conpassEventToEntityEvent, Event } from "@workspace/contract";
import { fetchConnpassEvents } from "../../domain/services/events/fetchConnpass.js";
import { fetchDoorkeeperEvents } from "../../domain/services/events/fetchDoorKeeper.js";

export const useFetchEventsUseCase = (eventRepository: IEventRepository) => {
  return async (): Promise<Event[]> => {
    // connpass APIは固定IPが必要なのでローカルではモックデータを返す
    if (env.NODE_ENV === 'local') {
      const mockResponse = generateMockResponse();
      const parsed = mockResponse.events.map(event => conpassEventToEntityEvent(event));
      console.log("Yamaguchi", parsed);
      return parsed;
    }
    try {
        // connpass API, DoorKeeper APIからイベント情報の取得
        const [connpassEvents, doorkeeperEvents] = await Promise.all([
          fetchConnpassEvents(),
          fetchDoorkeeperEvents(),
        ]);

        console.log(`Fetched ${doorkeeperEvents.length} events from Doorkeeper`);
        console.log(`Fetched ${connpassEvents.length} events from Connpass`);

        if (connpassEvents.length === 0 && doorkeeperEvents.length === 0) {
          console.log("No events found from Connpass and Doorkeeper API.");
          return [];
        }

        const events = [...doorkeeperEvents, ...connpassEvents];
        return events;
    } catch(error) {
        console.error(error);
        throw error;
    }
  };
}
