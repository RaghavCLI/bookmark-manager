"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getBookmarks() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: "Unauthorized", bookmarks: [] };
  }

  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { error: error.message, bookmarks: [] };
  }

  return { bookmarks, error: null };
}

export async function addBookmark(formData) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: "Unauthorized" };
  }

  const url = formData.get("url");
  const title = formData.get("title");

  // Validation
  if (!url || !title) {
    return { error: "URL and title are required" };
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    return { error: "Please enter a valid URL" };
  }

  const { error } = await supabase.from("bookmarks").insert({
    user_id: user.id,
    url: url.trim(),
    title: title.trim(),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { error: null };
}

export async function deleteBookmark(id) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: "Unauthorized" };
  }

  if (!id) {
    return { error: "Bookmark ID is required" };
  }

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // Extra safety: ensure user owns the bookmark

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { error: null };
}
