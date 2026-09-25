import type { Metadata } from "next";
import Link from "next/link";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Pagination } from "@/components/ui/Pagination";
import { adminUsers } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/format";

export const metadata: Metadata = { title: "Users" };

export default function UsersPage() {
  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage accounts for admins, outlet managers and cashiers."
        action={
          <Button size="sm" asChild>
            <Link href="/users/new">
              <Plus className="h-4 w-4" />
              Create User
            </Link>
          </Button>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
          <div className="w-64">
            <Input icon={<Search className="h-4 w-4" />} placeholder="Search by name or email…" />
          </div>
          <Select className="w-44" defaultValue="">
            <option value="">All roles</option>
            <option>Admin</option>
            <option>Outlet Manager</option>
            <option>Cashier</option>
          </Select>
          <Select className="w-40" defaultValue="">
            <option value="">All status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </Select>
        </div>
        <Table>
          <THead>
            <Tr>
              <Th>User</Th>
              <Th>Role</Th>
              <Th>Outlet</Th>
              <Th>Status</Th>
              <Th>Last Active</Th>
              <Th className="w-10" />
            </Tr>
          </THead>
          <TBody>
            {adminUsers.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={user.name} color={user.avatarColor} />
                    <div className="leading-tight">
                      <p className="font-medium text-ink-primary">{user.name}</p>
                      <p className="text-xs text-ink-muted">{user.email}</p>
                    </div>
                  </div>
                </Td>
                <Td className="text-ink-secondary">{user.role}</Td>
                <Td className="text-ink-secondary">{user.outlet}</Td>
                <Td>
                  <StatusBadge status={user.status} />
                </Td>
                <Td className="text-ink-secondary">{formatDateTime(user.lastActive)}</Td>
                <Td>
                  <Button variant="ghost" size="icon" aria-label="More actions">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <Pagination page={1} pageCount={1} totalLabel={`${adminUsers.length} users`} />
      </Card>
    </div>
  );
}
