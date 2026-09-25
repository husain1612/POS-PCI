"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import {
  AlertCircleIcon,
  BellIcon,
  CheckIcon,
  InfoIcon,
  PackageXIcon,
  RefundIcon,
  SyncOffIcon,
} from "@/components/icons";
import { NOTIFICATIONS as INITIAL_NOTIFICATIONS } from "@/lib/mock-data";
import { NOTIFICATION_TYPE_LABEL, NOTIFICATION_TYPE_VARIANT } from "@/lib/labels";
import { cn, formatDateTime } from "@/lib/utils";
import type { NotificationType } from "@/lib/types";

const TYPE_ICON: Record<NotificationType, typeof BellIcon> = {
  low_stock: AlertCircleIcon,
  out_of_stock: PackageXIcon,
  refund_request: RefundIcon,
  opname_approval: CheckIcon,
  sync_failed: SyncOffIcon,
  system_alert: InfoIcon,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const visible = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <div>
      <PageHeader
        title="Notifications"
        description={`${unreadCount} notifikasi belum dibaca`}
        actions={
          <Button variant="secondary" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
            Tandai Semua Dibaca
          </Button>
        }
      />

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-[8px] border px-3 py-1.5 text-xs font-medium transition-colors",
            filter === "all" ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border text-ink-muted hover:bg-surface-subtle"
          )}
        >
          Semua ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={cn(
            "rounded-[8px] border px-3 py-1.5 text-xs font-medium transition-colors",
            filter === "unread" ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border text-ink-muted hover:bg-surface-subtle"
          )}
        >
          Belum Dibaca ({unreadCount})
        </button>
      </div>

      <Card>
        {visible.length === 0 ? (
          <EmptyState icon={<BellIcon width={20} height={20} />} title="Tidak ada notifikasi" description="Semua notifikasi telah dibaca." />
        ) : (
          <ul className="divide-y divide-border-subtle">
            {visible.map((n) => {
              const Icon = TYPE_ICON[n.type];
              return (
                <li key={n.id} className={cn("flex items-start gap-3 px-5 py-4", !n.read && "bg-brand-50/40")}>
                  <span
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                      n.type === "out_of_stock" || n.type === "sync_failed"
                        ? "bg-error-50 text-error-600"
                        : n.type === "low_stock" || n.type === "refund_request"
                        ? "bg-warning-50 text-warning-600"
                        : "bg-brand-50 text-brand-600"
                    )}
                  >
                    <Icon width={16} height={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-ink">{n.title}</p>
                      <Badge variant={NOTIFICATION_TYPE_VARIANT[n.type]}>{NOTIFICATION_TYPE_LABEL[n.type]}</Badge>
                      {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />}
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">{n.message}</p>
                    <p className="mt-1.5 text-xs text-ink-faint">{formatDateTime(n.time)}</p>
                  </div>
                  {!n.read && (
                    <Button variant="ghost" size="sm" onClick={() => markRead(n.id)}>
                      Tandai Dibaca
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
