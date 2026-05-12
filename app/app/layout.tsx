import { AppSidebar } from "@/components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen app-grid">
      <AppSidebar />
      <div className="lg:pl-60">{children}</div>
    </div>
  );
}
