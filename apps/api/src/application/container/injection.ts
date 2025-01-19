import { useFetchHttpClient } from "../../infrastructure/gateway/http/fetch.js";
import { useEventRepository } from "../../infrastructure/repositories/eventRepository.js";
import { useFetchEventsUseCase } from "../../usecases/event/fetchEvents.js";
import { DIContainer } from "./container.js";
import { Dependencies } from "./types.js";

export const createContainer = (config: {
  baseURL: string;
}): DIContainer<Dependencies> => {
  const container = new DIContainer<Dependencies>();

  const httpClient = useFetchHttpClient(config.baseURL);
  const eventRepository = useEventRepository(httpClient);
  const fetchEvents = useFetchEventsUseCase(eventRepository);

  container.set('httpClient', httpClient);
  container.set('eventRepository', eventRepository);
  container.set('fetchEvents', fetchEvents);

  return container;
};
