import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  trustName: text("trustName").notNull(),
  trustLink: text("trustLink").notNull(),
  title: text("title").notNull(),
  link: text("link").notNull().unique(),
  publishedAt: timestamp("published_at"),
  cityMentions: text("cityMentions").array(),
  display: boolean("display").notNull().default(true),
  deleted: boolean("deleted").notNull().default(false),
});
