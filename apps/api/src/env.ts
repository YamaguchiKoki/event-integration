import { z } from "zod";

const commonSchema = z.object({
  NODE_ENV: z.enum(["local", "production"]),
  FRONTEND_URL: z.string().default("http://localhost:3000"),
  CONNPASS_API_URL: z.string().default("http://localhost:8787").describe("connpass APIのURL IP制限があるためローカルではモックする"),
});

const developmentSchema = z.object({
  DB_HOST: z.string().default("localhost"),
  DB_USER: z.string().default("root"),
  DB_PASSWORD: z.string().default("password"),
  DB_NAME: z.string().default("event-integration"),
  DB_PORT: z.string().default("3306"),
});

const productionSchema = z.object({
  TIDB_URL: z.string(),
  TIDB_USER: z.string(),
  TIDB_PASSWORD: z.string(),
});

const envSchema = z.discriminatedUnion("NODE_ENV", [
  // 開発環境
  commonSchema.extend({
    NODE_ENV: z.literal("local"),
  }).merge(developmentSchema),

  // 本番環境
  commonSchema.extend({
    NODE_ENV: z.literal("production"),
  }).merge(productionSchema),
]);


export type Env = z.infer<typeof envSchema>;
export const env = envSchema.parse(process.env);
