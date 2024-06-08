DO $$ BEGIN
 CREATE TYPE "public"."genre_enum" AS ENUM('action', 'comedy', 'drama', 'horror', 'romance', 'sci-fi');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movies_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"release_data" date NOT NULL,
	"description" text NOT NULL,
	"genre_enum" "genre_enum" NOT NULL,
	"rating" integer DEFAULT 0
);
