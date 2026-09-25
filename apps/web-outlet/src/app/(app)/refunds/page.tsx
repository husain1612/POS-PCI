import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { EmptyState } from "@/components/ui/States";
import { RefundIcon } from "@/components/icons";
import { REFUND_REQUESTS } from "@/lib/mock-data";
import { REFUND_STATUS_LABEL, REFUND_STATUS_VARIANT } from "@/lib/labels";
import { formatDateTime, formatIDR } from "@/lib/utils";

export default function RefundsPage() {
  const pending = REFUND_REQUESTS.filter((r) => r.status === "pending_review");
  const others = REFUND_REQUESTS.filter((r) => r.status !== "pending_review");

  return (
    <div>
      <PageHeader
        title="Refund"
        description="Antrean permintaan refund dari kasir yang perlu ditinjau outlet manager."
      />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryPill label="Menunggu Review" value={pending.length} variant="warning" />
        <SummaryPill
          label="Disetujui Bulan Ini"
          value={REFUND_REQUESTS.filter((r) => r.status === "approved" || r.status === "completed").length}
          variant="success"
        />
        <SummaryPill
          label="Ditolak Bulan Ini"
          value={REFUND_REQUESTS.filter((r) => r.status === "rejected").length}
          variant="error"
        />
      </div>

      <Card className="mb-4">
        <div className="border-b border-border-subtle px-5 py-3.5">
          <h2 className="text-sm font-semibold text-ink">Menunggu Review</h2>
        </div>
        {pending.length === 0 ? (
          <EmptyState
            icon={<RefundIcon width={20} height={20} />}
            title="Tidak ada permintaan refund"
            description="Semua permintaan refund telah ditinjau."
          />
        ) : (
          <RefundTable items={pending} />
        )}
      </Card>

      <Card>
        <div className="border-b border-border-subtle px-5 py-3.5">
          <h2 className="text-sm font-semibold text-ink">Riwayat</h2>
        </div>
        <RefundTable items={others} />
      </Card>
    </div>
  );
}

function SummaryPill({ label, value, variant }: { label: string; value: number; variant: "warning" | "success" | "error" }) {
  return (
    <div className="rounded-xl border border-border bg-surface-raised p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink-muted">{label}</span>
        <Badge variant={variant} dot />
      </div>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function RefundTable({ items }: { items: typeof REFUND_REQUESTS }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaksi</TableHead>
          <TableHead>Diajukan Oleh</TableHead>
          <TableHead>Waktu</TableHead>
          <TableHead>Alasan</TableHead>
          <TableHead className="text-right">Jumlah</TableHead>
          <TableHead>Status</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="font-medium text-ink">{r.transactionCode}</TableCell>
            <TableCell className="text-ink-muted">{r.requestedBy}</TableCell>
            <TableCell className="text-ink-muted">{formatDateTime(r.requestedAt)}</TableCell>
            <TableCell className="max-w-[240px] truncate text-ink-muted" title={r.reason}>
              {r.reason}
            </TableCell>
            <TableCell className="text-right font-medium text-ink">{formatIDR(r.amount)}</TableCell>
            <TableCell>
              <Badge variant={REFUND_STATUS_VARIANT[r.status]} dot>
                {REFUND_STATUS_LABEL[r.status]}
              </Badge>
            </TableCell>
            <TableCell>
              <Link href={`/refunds/${r.id}`}>
                <Button variant="ghost" size="sm">
                  Tinjau
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
