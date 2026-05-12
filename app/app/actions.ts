"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function resolveApproval(formData: FormData): Promise<void> {
  const id = String(formData.get("id"));
  const decision = String(formData.get("decision")) as "approved" | "rejected";
  const note = String(formData.get("note") ?? "").trim() || null;

  if (!id || (decision !== "approved" && decision !== "rejected")) return;

  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  await supabase
    .from("approvals")
    .update({
      status: decision,
      resolved_by: user.user?.id ?? null,
      resolved_at: new Date().toISOString(),
      resolution_note: note,
    })
    .eq("id", id);

  revalidatePath("/app", "layout");
}

export async function toggleSchedule(formData: FormData): Promise<void> {
  const id = String(formData.get("id"));
  const active = String(formData.get("active")) === "true";

  if (!id) return;

  const supabase = await createClient();
  await supabase.from("schedules").update({ active: !active }).eq("id", id);

  revalidatePath("/app/scheduled");
}

export async function addKnowledge(formData: FormData): Promise<void> {
  const workspaceId = String(formData.get("workspace_id"));
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!workspaceId || !title) return;

  const supabase = await createClient();
  await supabase.from("knowledge").insert({
    workspace_id: workspaceId,
    title,
    body,
    kind: "Pinned fact",
  });

  revalidatePath("/app/knowledge");
}

export async function signOutAction(): Promise<void> {
  const { signOut } = await import("@/app/auth/actions");
  await signOut();
}
