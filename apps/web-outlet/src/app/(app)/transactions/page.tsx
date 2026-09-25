import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { DownloadIcon, FilterIcon, SearchIcon } from "@/components/icons";
import { TRANSACTIONS } from "@/lib/mock-data";
import { PAYMENT_METHOD_LABEL, TRANSACTION_STATUS_LABEL, TRANSACTION_STATUS_VARIANT } from "@/lib/labels";
import { formatDateTime, formatIDR } from "@/lib/utils";

export default function TransactionsPage() {
  return (
    <div>
      <PageHeader
        title="Transactions"
        description={`${TRANSACTIONS.length} transaksi tercatat di outlet ini`}
        actions={
          <Button variant="secondary" size="sm">
            <DownloadIcon width={15} height={15} />
            Export CSV
          </Button>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2.5 border-b border-border-subtle px-5 py-3.5">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon width={15} height={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <Input placeholder="Cari kode transaksi atau kasir..." className="pl-9" />
          </div>
          <Select defaultValue="all" className="w-auto min-w-[150px]">
            <option value="all">Semua Status</option>
            <option value="completed">Selesai</option>
            <option value="refunded">Direfund</option>
            <option value="partially_refunded">Refund Sebagian</option>
            <option value="voided">Dibatalkan</option>
            <option value="pending">Menunggu</option>
          </Select>
          <Select defaultValue="all" className="w-auto min-w-[150px]">
            <option value="all">Semua Pembayaran</option>
            <option value="cash">Tunai</option>
            <option value="qris">QRIS</option>
            <option value="debit">Kartu Debit</option>
            <option value="credit_card">Kartu Kredit</option>
            <option value="e_wallet">E-Wallet</option>
          </Select>
          <Button variant="outline" size="sm">
            <FilterIcon width={15} height={15} />
            Filter Tanggal
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode Transaksi</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Kasir</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Pembayaran</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {TRANSACTIONS.map((trx) => (
              <TableRow key={trx.id}>
                <TableCell className="font-medium text-ink">{trx.code}</TableCell>
                <TableCell className="text-ink-muted">{formatDateTime(trx.date)}</TableCell>
                <TableCell className="text-ink-muted">{trx.cashier}</TableCell>
                <TableCell className="text-ink-muted">{trx.itemCount} item</TableCell>
                <TableCell className="text-ink-muted">{PAYMENT_METHOD_LABEL[trx.paymentMethod]}</TableCell>
                <TableCell className="text-right font-medium text-ink">{formatIDR(trx.total)}</TableCell>
                <TableCell>
                  <Badge variant={TRANSACTION_STATUS_VARIANT[trx.status]} dot>
                    {TRANSACTION_STATUS_LABEL[trx.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/transactions/${trx.id}`}>
                    <Button variant="ghost" size="sm">
                      Detail
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t border-border-subtle px-5 py-3.5 text-sm text-ink-muted">
          <span>Menampilkan {TRANSACTIONS.length} dari {TRANSACTIONS.length} transaksi</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm" disabled>
              Selanjutnya
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
