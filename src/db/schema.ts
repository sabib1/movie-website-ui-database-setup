import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const movies = sqliteTable('movies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  poster: text('poster').notNull(),
  rating: integer('rating').notNull(),
  duration: text('duration').notNull(),
  description: text('description').notNull(),
});