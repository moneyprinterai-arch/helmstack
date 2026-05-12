import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { createClient } from "@/lib/supabase/server";
import { getWorkspace } from "@/lib/queries";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: userRes } = await supabase.auth.getUser();
  const user = userRes.user;
  if (!user) redirect("/login?next=/app");

  const workspace = await getWorkspace();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .maybeSingle();

  const { count: pendingApprovals } = workspace
    ? await supabase
        .from("approvals")
        .select("id", { count: "exact", head: true })
        .eq("workspace_id", workspace.id)
        .eq("status", "pending")
    : { count: 0 };

  return (
    <div className="min-h-screen app-grid">
      <AppSidebar
        workspaceName={workspace?.name ?? "Workspace"}
        userEmail={profile?.email ?? user.email ?? ""}
        userName={profile?.full_name ?? user.email?.split("@")[0] ?? "you"}
        pendingApprovals={pendingApprovals ?? 0}
      />
      <div className="lg:pl-60">{children}</div>
    </div>
  );
}
