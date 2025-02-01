import { z } from "zod";

// イベントシリーズ情報
export const EventSeriesSchema = z.object({
  id: z.number(),
  subdomain: z.string(),
  title: z.string(),
  url: z.string().url(),
});
export type EventSeries = z.infer<typeof EventSeriesSchema>;

// Connpass の生データ形式
export const RawEventSchema = z.object({
  id: z.number(),
  event_id: z.number(),
  title: z.string(),
  catch: z.string(),
  description: z.string(),
  url: z.string().url(),
  event_url: z.string().url(),
  image_url: z.string().url(),
  hash_tag: z.string(),
  started_at: z.string().datetime(), // ISO 8601
  ended_at: z.string().datetime(),   // ISO 8601
  limit: z.number().optional(),
  event_type: z.string(),
  open_status: z.string(),
  series: EventSeriesSchema,
  address: z.string(),
  place: z.string(),
  lat: z.string(),
  lon: z.string(),
  owner_id: z.number(),
  owner_nickname: z.string(),
  owner_display_name: z.string(),
  accepted: z.number(),
  waiting: z.number(),
  updated_at: z.string().datetime(), // ISO 8601
});
export type RawEvent = z.infer<typeof RawEventSchema>;

// Connpass API レスポンススキーマ
export const ConnpassApiResponseSchema = z.object({
  results_returned: z.number(),
  results_available: z.number(),
  results_start: z.number(),
  events: z.array(RawEventSchema),
});
export type ConnpassApiResponse = z.infer<typeof ConnpassApiResponseSchema>;
