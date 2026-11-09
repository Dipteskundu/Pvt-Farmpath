import { ToastProvider } from "@/components/ui/Toast";
import { AgriPortalShell } from "@/features/layout";
import { RouteGuard } from "@/features/layout/RouteGuard";
import { RouteTransition } from "@/components/motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <RouteGuard>
        <AgriPortalShell>
          <RouteTransition>{children}</RouteTransition>
        </AgriPortalShell>
      </RouteGuard>
    </ToastProvider>
  );
}
