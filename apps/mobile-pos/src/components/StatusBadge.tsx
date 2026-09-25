import React from "react";
import { TransactionStatus } from "@/types";
import { Badge, BadgeVariant } from "./Badge";

const STATUS_MAP: Record<TransactionStatus, { label: string; variant: BadgeVariant }> = {
  completed: { label: "Selesai", variant: "success" },
  void: { label: "Void", variant: "error" },
  refunded: { label: "Refund", variant: "warning" },
  partially_refunded: { label: "Refund Sebagian", variant: "warning" },
  pending_sync: { label: "Menunggu Sinkron", variant: "info" },
};

export function StatusBadge({ status }: { status: TransactionStatus }) {
  const config = STATUS_MAP[status];
  return <Badge label={config.label} variant={config.variant} />;
}
