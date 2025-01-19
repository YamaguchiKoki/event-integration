import { IEventRepository } from "../../domain/repositories/IEventRepository";
import { IHttpClient } from "../../infrastructure/gateway/http/client";
import { useFetchEventsUseCase } from "../../usecases/event/fetchEvents";

export type Dependencies = {
  httpClient: IHttpClient;
  eventRepository: IEventRepository;
  fetchEvents: ReturnType<typeof useFetchEventsUseCase>;
};
