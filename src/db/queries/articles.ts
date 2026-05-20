import { db } from "../index";
import { articles } from "../schema";
import { desc, eq, sql } from "drizzle-orm";

export const insertArticles = async (
  data: (typeof articles.$inferInsert)[],
) => {
  return db.insert(articles).values(data).onConflictDoNothing();
};

export const getLatestArticles = async (limit?: number) => {
  return limit
    ? db
        .select()
        .from(articles)
        .where(eq(articles.deleted, false))
        .orderBy(desc(articles.publishedAt))
        .limit(limit)
    : db
        .select()
        .from(articles)
        .where(eq(articles.deleted, false))
        .orderBy(desc(articles.publishedAt));
};

export const getArticlesByCity = async (city: string) => {
  return db.execute(sql`
    SELECT *
    FROM articles
    WHERE ${city} = ANY(cities) AND deleted is TRUE
  `);
};

type UpdateArticleData = Partial<typeof articles.$inferInsert>;

export const updateArticle = async (id: string, data: UpdateArticleData) => {
  return db.update(articles).set(data).where(eq(articles.id, id)).returning();
};
