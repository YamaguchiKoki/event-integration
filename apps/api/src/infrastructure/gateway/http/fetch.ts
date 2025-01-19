import { IHttpClient } from "./client";

export const useFetchHttpClient = (
  baseURL: string
): IHttpClient => ({
  get: async <T>(path: string, params?: Record<string, string>): Promise<T> => {
    const url = baseURL ? `${baseURL}${path}` : path;
    const searchParams = new URLSearchParams(params);
    const urlWithParams = `${url}?${searchParams.toString()}`;
    console.log(urlWithParams);

    const response = await fetch(urlWithParams);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
})
