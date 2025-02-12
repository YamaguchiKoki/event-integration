import { Event } from "@workspace/contract";
import { IEventRepository } from "../../domain/repositories/IEventRepository.js";
import { IHttpClient } from "../gateway/http/client.js";
import { fetchConnpassEvents } from "../../domain/services/events/fetchConnpass.js";
import { fetchDoorkeeperEvents } from "../../domain/services/events/fetchDoorKeeper.js";


export const useEventRepository = (
  httpClient: IHttpClient
): IEventRepository => {
  return {
  };
}
