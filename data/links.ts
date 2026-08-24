import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { links } from "@/db/schema";

export function getLinksForUser(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

export async function getLinkBySlug(slug: string) {
  const [link] = await db.select().from(links).where(eq(links.slug, slug));
  return link;
}

export async function createLink(data: {
  userId: string;
  slug: string;
  url: string;
}) {
  const [link] = await db.insert(links).values(data).returning();
  return link;
}

export async function updateLink(
  id: number,
  userId: string,
  data: { slug: string; url: string },
) {
  const [link] = await db
    .update(links)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return link;
}

export async function deleteLink(id: number, userId: string) {
  const [link] = await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return link;
}
