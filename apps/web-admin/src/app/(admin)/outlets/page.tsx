import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { outlets } from "@/lib/mock-data";
import { formatIDR, formatNumber } from "@/lib/format";

export const metadata: Metadata = { title: "Outlets" };

export default function OutletsPage() {
  return (
    <div>
      <PageHeader
        title="Outlets"
        description="All outlet locations across your organizations."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Outlet
          </Button>
        }
      />

      <Card>
        <div className="flex items-center gap-2 border-b border-border p-3">
          <div className="w-72">
            <Input icon={<Search className="h-4 w-4" />} placeholder="Search outlets…" />
          </div>
        </div>
        <Table>
          <THead>
            <Tr>
              <Th>Outlet</Th>
              <Th>Code</Th>
              <Th>Manager</Th>
              <Th>City</Th>
              <Th>Revenue (mo.)</Th>
              <Th>Transactions</Th>
              <Th>Status</Th>
            </Tr>
          </THead>
          <TBody>
            {outlets.map((outlet) => (
              <Tr key={outlet.id} className="cursor-pointer">
                <Td className="font-medium">
                  <Link href={`/outlets/${outlet.id}`} className="hover:text-brand">
                    {outlet.name}
                  </Link>
                </Td>
                <Td className="text-ink-secondary">{outlet.code}</Td>
                <Td className="text-ink-secondary">{outlet.manager}</Td>
                <Td className="text-ink-secondary">{outlet.city}</Td>
                <Td className="tabular-nums">{formatIDR(outlet.revenueThisMonth)}</Td>
                <Td className="tabular-nums">{formatNumber(outlet.transactionsThisMonth)}</Td>
                <Td>
                  <StatusBadge status={outlet.status} />
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <Pagination page={1} pageCount={1} totalLabel={`${outlets.length} outlets`} />
      </Card>
    </div>
  );
}
