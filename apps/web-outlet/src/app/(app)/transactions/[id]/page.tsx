import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { ChevronLeftIcon, DownloadIcon, RefundIcon } from "@/components/icons";
import { TRANSACTIONS } from "@/lib/mock-data";
import { PAYMENT_METHOD_LABEL, TRANSACTION_STATUS_LABEL, TRANSACTION_STATUS_VARIANT } from "@/lib/labels";
import { formatDateTime, formatIDR } from "@/lib/utils";

export function generateStaticParams() {
  return TRANSACTIONS.map((t) => ({ id: t.id }));
}

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  const trx = TRANSACTIONS.find((t) => t.id === params.id);
  if (!trx) notFound();

  return (
    <div>
      <Link href="/transactions" className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-ink-muted hover:text-ink">
        <ChevronLeftIcon width={15} height={15} />
        Kembali ke Transactions
      </Link>

      <PageHeader
        title={trx.code}
        description={`Dicatat oleh ${trx.cashier} · ${formatDateTime(trx.date)}`}
        actions={
          <>
            <Button variant="secondary" size="sm">
              <DownloadIcon width={15} height={15} />
              Cetak Struk
            </Button>
            <Link href="/refunds">
              <Button variant="outline" size="sm">
                <RefundIcon width={15} height={15} />
                Ajukan Refund
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Item Transaksi</CardTitle>
            <Badge variant={TRANSACTION_STATUS_VARIANT[trx.status]} dot>
              {TRANSACTION_STATUS_LABEL[trx.status]}
            </Badge>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Harga</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trx.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-ink">{item.productName}</TableCell>
                  <TableCell className="text-ink-muted">{item.sku}</TableCell>
                  <TableCell className="text-right text-ink-muted">{item.qty}</TableCell>
                  <TableCell className="text-right text-ink-muted">{formatIDR(item.price)}</TableCell>
                  <TableCell className="text-right font-medium text-ink">{formatIDR(item.subtotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 text-sm">
              <Row label="Subtotal" value={formatIDR(trx.subtotal)} />
              <Row label="Diskon" value={`- ${formatIDR(trx.discount)}`} muted={trx.discount === 0} />
              <Row label="Pajak (PPN 11%)" value={formatIDR(trx.tax)} />
              <div className="my-1 border-t border-border-subtle" />
              <Row label="Total" value={formatIDR(trx.total)} bold />
              <div className="my-1 border-t border-border-subtle" />
              <Row label="Metode Pembayaran" value={PAYMENT_METHOD_LABEL[trx.paymentMethod]} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Outlet</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 text-sm">
              <Row label="Outlet" value={trx.outlet} />
              <Row label="Kasir" value={trx.cashier} />
              <Row label="Waktu" value={formatDateTime(trx.date)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, muted, bold }: { label: string; value: string; muted?: boolean; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-ink-muted">{label}</span>
      <span className={bold ? "font-semibold text-ink" : muted ? "text-ink-faint" : "font-medium text-ink"}>
        {value}
      </span>
    </div>
  );
}
