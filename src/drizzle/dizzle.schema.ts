import {
  integer,
  pgEnum,
  pgTable,
  uuid,
  text,
  date,
} from 'drizzle-orm/pg-core';

export const genreEnum = pgEnum('genre_enum', [
  'action',
  'comedy',
  'drama',
  'horror',
  'romance',
  'sci-fi',
]);

export const MovieSchema = pgTable('movies_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  release_data: date('release_data', { mode: 'date' }).notNull(),
  description: text('description').notNull(),
  genre: genreEnum('genre_enum').notNull(),
  rating: integer('rating').default(0),
});
