ALTER TABLE "articles" ADD COLUMN "display" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "deleted" boolean DEFAULT false NOT NULL;