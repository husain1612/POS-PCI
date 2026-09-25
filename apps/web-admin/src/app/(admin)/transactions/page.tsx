import type { Metadata } from "next";
import { Download, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { transactions, outlets } from "@/lib/mock-data";
import { formatDateTime, formatIDR } from "@/lib/format";

export const metadata: Metadata = { title: "Transaction Monitoring" };

export default function TransactionsPage() {
  return (
    <div>
      <PageHeader
        title="Transaction Monitoring"
        description="Live view of transactions across every outlet."
        action={
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
          <div className="w-64">
            <Input icon={<Search className="h-4 w-4" />} placeholder="Search transaction ID…" />
          </div>
          <Select className="w-44" defaultValue="">
            <option value="">All outlets</option>
            {outlets.map((o) => (
              <option key={o.id}>{o.name}</option>
            ))}
          </Select>
          <Select className="w-40" defaultValue="">
            <option value="">All status</option>
            <option>Completed</option>
            <option>Refunded</option>
            <option>Voided</option>
            <option>Pending</option>
          </Select>
        </div>
        <Table>
          <THead>
            <Tr>
              <Th>Transaction ID</Th>
              <Th>Outlet</Th>
              <Th>Cashier</Th>
              <Th>Payment</Th>
              <Th>Items</Th>
              <Th>Total</Th>
              <Th>Time</Th>
              <Th>Status</Th>
            </Tr>
          </THead>
          <TBody>
            {transactions.map((tx) => (
              <Tr key={tx.id}>
                <Td className="font-medium">{tx.id}</Td>
                <Td className="text-ink-secondary">{tx.outlet}</Td>
                <Td className="text-ink-secondary">{tx.cashier}</Td>
                <Td className="text-ink-secondary">{tx.paymentMethod}</Td>
                <Td className="tabular-nums">{tx.itemCount}</Td>
                <Td className="tabular-nums font-medium">{formatIDR(tx.total)}</Td>
                <Td className="text-ink-secondary">{formatDateTime(tx.createdAt)}</Td>
                <Td>
                  <StatusBadge status={tx.status} />
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <Pagination page={1} pageCount={12} totalLabel={`${transactions.length} of 18,204 transactions`} />
      </Card>
    </div>
  );
}
