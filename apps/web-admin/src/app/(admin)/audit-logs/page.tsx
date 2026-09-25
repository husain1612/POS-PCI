import type { Metadata } from "next";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Input, Select } from "@/components/ui/Input";
import { auditLogs } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Audit Logs" };

const actionTone: Record<string, string> = {
  Created: "text-success",
  Approved: "text-success",
  Updated: "text-brand",
  Exported: "text-brand",
  Refunded: "text-warning",
  Deleted: "text-danger",
  Alert: "text-danger",
};

export default function AuditLogsPage() {
  return (
    <div>
      <PageHeader title="Audit Logs" description="Every meaningful action taken across the system, by user and module." />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
          <div className="w-64">
            <Input icon={<Search className="h-4 w-4" />} placeholder="Search logs…" />
          </div>
          <Select className="w-44" defaultValue="">
            <option value="">All modules</option>
            <option>Promotions</option>
            <option>Inventory</option>
            <option>Users</option>
            <option>Products</option>
            <option>Transactions</option>
            <option>Outlets</option>
            <option>Reports</option>
            <option>Sync</option>
          </Select>
        </div>
        <Table>
          <THead>
            <Tr>
              <Th>User</Th>
              <Th>Action</Th>
              <Th>Module</Th>
              <Th>Data</Th>
              <Th>Timestamp</Th>
            </Tr>
          </THead>
          <TBody>
            {auditLogs.map((log) => (
              <Tr key={log.id}>
                <Td className="font-medium">{log.user}</Td>
                <Td>
                  <span className={cn("font-medium", actionTone[log.action] ?? "text-ink-secondary")}>{log.action}</span>
                </Td>
                <Td>
                  <Badge>{log.module}</Badge>
                </Td>
                <Td className="max-w-md whitespace-normal text-ink-secondary">{log.data}</Td>
                <Td className="text-ink-secondary">{formatDateTime(log.timestamp)}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
