import type { Metadata } from "next";
import { MoreHorizontal, Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { organizations } from "@/lib/mock-data";
import { formatDate, formatNumber } from "@/lib/format";

export const metadata: Metadata = { title: "Organizations" };

export default function OrganizationsPage() {
  return (
    <div>
      <PageHeader
        title="Organizations"
        description="Businesses running the POS ecosystem under your management."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Organization
          </Button>
        }
      />

      <Card>
        <Table>
          <THead>
            <Tr>
              <Th>Organization</Th>
              <Th>Legal Name</Th>
              <Th>Plan</Th>
              <Th>Outlets</Th>
              <Th>Users</Th>
              <Th>Joined</Th>
              <Th>Status</Th>
              <Th className="w-10" />
            </Tr>
          </THead>
          <TBody>
            {organizations.map((org) => (
              <Tr key={org.id}>
                <Td className="font-medium">{org.name}</Td>
                <Td className="text-ink-secondary">{org.legalName}</Td>
                <Td>
                  <span
                    className={
                      org.plan === "Professional"
                        ? "rounded-md bg-brand-subtle px-2 py-0.5 text-xs font-medium text-brand"
                        : "rounded-md bg-surface-raised px-2 py-0.5 text-xs font-medium text-ink-secondary"
                    }
                  >
                    {org.plan}
                  </span>
                </Td>
                <Td className="tabular-nums">{org.outletCount}</Td>
                <Td className="tabular-nums">{formatNumber(org.userCount)}</Td>
                <Td className="text-ink-secondary">{formatDate(org.joinedAt)}</Td>
                <Td>
                  <StatusBadge status={org.status} />
                </Td>
                <Td>
                  <Button variant="ghost" size="icon" aria-label="More actions">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <Pagination page={1} pageCount={1} totalLabel={`${organizations.length} organizations`} />
      </Card>
    </div>
  );
}
