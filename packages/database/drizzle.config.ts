// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import { env } from "@workspace/configs/env.js";

const getDatabaseConfig = () => {
  if (env.NODE_ENV === "production") {
    return {
      driver: '@tidbcloud/serverless' as const,
      url: env.TIDB_URL,
      username: env.TIDB_USER,
      password: env.TIDB_PASSWORD,
    };
  }

  return {
    driver: 'mysql2' as const,
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: parseInt(env.DB_PORT),
  };
};

export default defineConfig({
  dialect: "mysql",
  schema: "./src/tidb/schema/*",
  out: "./src/tidb/migration",
  dbCredentials: getDatabaseConfig(),
  ...(env.NODE_ENV === "production" && {
    dbProvider: '@tidbcloud/serverless'
  })
});
