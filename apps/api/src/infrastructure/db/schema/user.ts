import { relations, sql } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .onUpdateNow()
    .notNull(),
});

export const userPersonalInformation = mysqlTable('user_personal_information', {
  userId: int('user_id').primaryKey(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  personalInformation: one(userPersonalInformation, {
    fields: [users.id],
    references: [userPersonalInformation.userId],
  }),
}));

export const userPersonalInformationRelations = relations(userPersonalInformation, ({ one }) => ({
  user: one(users, {
    fields: [userPersonalInformation.userId],
    references: [users.id],
  }),
}));

export const userInsertSchema = createInsertSchema(users);
