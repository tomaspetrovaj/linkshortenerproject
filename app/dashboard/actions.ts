"use server";

import { randomBytes } from "crypto";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createLink, deleteLink, updateLink } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().trim().min(1, "URL is required").url("Enter a valid URL"),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(32, "Slug must be at most 32 characters")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Slug can only contain letters, numbers, hyphens, and underscores"
    )
    .optional()
    .or(z.literal("")),
});

type CreateLinkInput = {
  url: string;
  slug?: string;
};

function generateSlug() {
  return randomBytes(5).toString("base64url");
}

export async function createLinkAction(
  input: CreateLinkInput
): Promise<{ error: string } | { success: true }> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in to create a link." };
  }

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const slug = parsed.data.slug || generateSlug();

  try {
    await createLink({ userId, slug, url: parsed.data.url });
  } catch {
    return { error: "That short link is already taken. Try a different one." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().trim().min(1, "URL is required").url("Enter a valid URL"),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(32, "Slug must be at most 32 characters")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Slug can only contain letters, numbers, hyphens, and underscores"
    ),
});

type UpdateLinkInput = {
  id: number;
  url: string;
  slug: string;
};

export async function updateLinkAction(
  input: UpdateLinkInput
): Promise<{ error: string } | { success: true }> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in to update a link." };
  }

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  let updated;
  try {
    updated = await updateLink(parsed.data.id, userId, {
      slug: parsed.data.slug,
      url: parsed.data.url,
    });
  } catch {
    return { error: "That short link is already taken. Try a different one." };
  }

  if (!updated) {
    return { error: "Link not found." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

type DeleteLinkInput = {
  id: number;
};

export async function deleteLinkAction(
  input: DeleteLinkInput
): Promise<{ error: string } | { success: true }> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in to delete a link." };
  }

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const deleted = await deleteLink(parsed.data.id, userId);
  if (!deleted) {
    return { error: "Link not found." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
