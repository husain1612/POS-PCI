"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Stepper, type StepperStep } from "@/components/ui/Stepper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { ChevronLeftIcon, CheckIcon, CloseIcon } from "@/components/icons";
import { REFUND_REQUESTS } from "@/lib/mock-data";
import { REFUND_STATUS_LABEL, REFUND_STATUS_VARIANT } from "@/lib/labels";
import { formatDateTime, formatIDR } from "@/lib/utils";
import type { RefundStatus } from "@/lib/types";

const STEPS: StepperStep[] = [
  { key: "transaction", label: "Transaction" },
  { key: "items", label: "Select Items" },
  { key: "reason", label: "Refund Reason" },
  { key: "confirmation", label: "Confirmation" },
  { key: "complete", label: "Refund Complete" },
];

function stepIndexFor(status: RefundStatus) {
  switch (status) {
    case "pending_review":
      return 3;
    case "approved":
      return 4;
    case "rejected":
      return 3;
    case "completed":
      return 5;
    default:
      return 0;
  }
}

export default function RefundDetailPage() {
  const params = useParams<{ id: string }>();
  const initial = REFUND_REQUESTS.find((r) => r.id === params.id);
  const [status, setStatus] = useState<RefundStatus | null>(initial?.status ?? null);

  if (!initial) notFound();
  const refund = initial;
  const activeIndex = stepIndexFor(status ?? refund.status);

  return (
    <div>
      <Link href="/refunds" className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-ink-muted hover:text-ink">
        <ChevronLeftIcon width={15} height={15} />
        Kembali ke Refund
      </Link>

      <PageHeader
        title={`Refund — ${refund.transactionCode}`}
        description={`Diajukan oleh ${refund.requestedBy} · ${formatDateTime(refund.requestedAt)}`}
        actions={
          <Badge variant={REFUND_STATUS_VARIANT[status ?? refund.status]} dot>
            {REFUND_STATUS_LABEL[status ?? refund.status]}
          </Badge>
        }
      />

      <Card className="mb-4">
        <CardContent className="py-6">
          {status === "rejected" ? (
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error-50 text-error-600">
                <CloseIcon width={18} height={18} />
              </div>
              <p className="text-sm font-medium text-ink">Permintaan refund ditolak</p>
              <p className="max-w-sm text-sm text-ink-muted">
                Alur refund dihentikan pada tahap Confirmation. Kasir telah diberi notifikasi.
              </p>
            </div>
          ) : (
            <Stepper steps={STEPS} activeIndex={activeIndex} />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Item yang Direfund</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refund.items.map((item) => (
                <TableRow key={item.productName}>
                  <TableCell className="font-medium text-ink">{item.productName}</TableCell>
                  <TableCell className="text-right text-ink-muted">{item.qty}</TableCell>
                  <TableCell className="text-right font-medium text-ink">{formatIDR(item.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CardContent className="border-t border-border-subtle">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-ink">Total Refund</span>
              <span className="text-base font-semibold text-ink">{formatIDR(refund.amount)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Refund Reason</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-ink-muted">{refund.reason}</CardContent>
          </Card>

          {(status ?? refund.status) === "pending_review" && (
            <Card>
              <CardHeader>
                <CardTitle>Tindakan Approval</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5">
                <p className="text-xs text-ink-muted">
                  Tinjau detail refund di atas sebelum menyetujui atau menolak permintaan ini.
                </p>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => setStatus("approved")}>
                    <CheckIcon width={15} height={15} />
                    Setujui
                  </Button>
                  <Button variant="destructive" className="flex-1" onClick={() => setStatus("rejected")}>
                    <CloseIcon width={15} height={15} />
                    Tolak
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {(status ?? refund.status) === "approved" && (
            <Card>
              <CardHeader>
                <CardTitle>Proses Refund</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5">
                <p className="text-xs text-ink-muted">
                  Refund disetujui. Selesaikan proses pengembalian dana ke pelanggan untuk menutup permintaan ini.
                </p>
                <Button className="w-full" onClick={() => setStatus("completed")}>
                  Tandai Refund Selesai
                </Button>
              </CardContent>
            </Card>
          )}

          {(status ?? refund.status) === "completed" && (
            <Card>
              <CardContent className="flex flex-col items-center gap-2 py-6 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-50 text-success-600">
                  <CheckIcon width={18} height={18} />
                </div>
                <p className="text-sm font-medium text-ink">Refund Complete</p>
                <p className="text-xs text-ink-muted">
                  Dana sebesar {formatIDR(refund.amount)} telah dikembalikan ke pelanggan.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
