import { z } from "zod";

// Doorkeeper イベントスキーマ
export const DoorkeeperEventSchema = z.object({
  id: z.number(),
  title: z.string(),
  starts_at: z.string().datetime(), // ISO 8601
  ends_at: z.string().datetime(),   // ISO 8601
  venue_name: z.string(),
  address: z.string(),
  published_at: z.string().datetime(), // ISO 8601
  updated_at: z.string().datetime(),   // ISO 8601
  group: z.number().describe("グループID grpups/groupIdでグループ情報取得可能"),
  banner: z.string().url(),
  description: z.string(),
  public_url: z.string().url(),
  participants: z.number(),
  waitlisted: z.number(),
  ticket_limit: z.number(),
  lat: z.number(),
  long: z.number(),
});
export type DoorkeeperEvent = z.infer<typeof DoorkeeperEventSchema>;

export const DoorkeeperEventResponseSchema = z.object({
  events: z.array(DoorkeeperEventSchema),
});
export type DoorkeeperEventResponse = z.infer<typeof DoorkeeperEventResponseSchema>;
