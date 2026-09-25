import type { Metadata } from "next";
import {
  AlertOctagon,
  CheckCheck,
  ClipboardCheck,
  Info,
  PackageX,
  RefreshCcw,
  TrendingDown,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { notifications } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { NotificationKind } from "@/lib/types";

export const metadata: Metadata = { title: "Notifications" };

const kindMeta: Record<NotificationKind, { icon: typeof Info; tone: string }> = {
  "low-stock": { icon: TrendingDown, tone: "bg-warning-subtle text-warning" },
  "out-of-stock": { icon: PackageX, tone: "bg-danger-subtle text-danger" },
  "refund-request": { icon: ClipboardCheck, tone: "bg-brand-subtle text-brand" },
  "stock-opname": { icon: CheckCheck, tone: "bg-brand-subtle text-brand" },
  "sync-failed": { icon: RefreshCcw, tone: "bg-danger-subtle text-danger" },
  system: { icon: AlertOctagon, tone: "bg-surface-raised text-ink-secondary" },
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Notification Center"
        description={`${unreadCount} unread — low stock, refunds, approvals, sync and system alerts.`}
        action={
          <Button variant="secondary" size="sm">
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        }
      />

      {notifications.length === 0 ? (
        <Card>
          <EmptyState title="You're all caught up" description="New alerts about stock, refunds and sync will show up here." />
        </Card>
      ) : (
        <Card className="divide-y divide-border">
          {notifications.map((n) => {
            const meta = kindMeta[n.kind];
            const Icon = meta.icon;
            return (
              <div key={n.id} className={cn("flex gap-3 px-5 py-4", !n.read && "bg-brand-subtle/30")}>
                <span className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full", meta.tone)}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[13px] font-medium text-ink-primary">{n.title}</p>
                    {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />}
                  </div>
                  <p className="mt-0.5 text-[13px] text-ink-muted">{n.description}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-ink-muted">
                    <span>{formatDateTime(n.timestamp)}</span>
                    {n.outlet && (
                      <>
                        <span>·</span>
                        <span>{n.outlet}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
}
