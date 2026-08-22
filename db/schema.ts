import { pgTable, integer, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  // Clerk user id; no FK since Clerk users aren't stored in this DB
  userId: text('user_id').notNull(),
  slug: varchar('slug', { length: 32 }).notNull().unique(),
  url: text('url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
