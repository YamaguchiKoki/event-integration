// src/db/schema/migrations.ts
import { sql } from "drizzle-orm";
import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

export const migrations = mysqlTable("migrations", {
  id: varchar("id", { length: 255 }).primaryKey(),
  hash: varchar("hash", { length: 255 }).notNull(),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
