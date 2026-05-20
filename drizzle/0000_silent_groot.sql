CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trustName" text NOT NULL,
	"trustLink" text NOT NULL,
	"title" text NOT NULL,
	"link" text NOT NULL,
	"published_at" timestamp,
	"cityMentions" text[],
	CONSTRAINT "articles_link_unique" UNIQUE("link")
);
