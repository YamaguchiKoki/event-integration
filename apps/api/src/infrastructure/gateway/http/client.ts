export type IHttpClient = {
  get: <T>(url: string, params?: Record<string, string>) => Promise<T>;
};
