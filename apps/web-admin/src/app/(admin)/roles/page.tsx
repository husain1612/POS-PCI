import type { Metadata } from "next";
import { Check, Minus, ShieldCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { roles, permissionModules } from "@/lib/mock-data";
import type { PermissionAction, RoleDefinition } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Roles & Permissions" };

const actions: { key: PermissionAction; label: string }[] = [
  { key: "view", label: "View" },
  { key: "create", label: "Create" },
  { key: "update", label: "Update" },
  { key: "delete", label: "Delete" },
  { key: "approve", label: "Approve" },
  { key: "export", label: "Export" },
];

export default function RolesPage() {
  return (
    <div>
      <PageHeader title="Roles & Permissions" description="Define what each role can view, create, update, delete, approve and export." />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id} className="p-5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-subtle text-brand">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold text-ink-primary">{role.name}</p>
            </div>
            <p className="mt-2.5 text-[13px] text-ink-muted">{role.description}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-muted">
              <Users className="h-3.5 w-3.5" />
              {role.userCount} users assigned
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="Permission Matrix" description="Toggle-ready view of role capabilities per module (read-only preview)." />
        <CardContent>
          <Tabs items={roles.map((role) => ({ key: role.id, label: role.name, content: <PermissionTable role={role} /> }))} />
        </CardContent>
      </Card>
    </div>
  );
}

function PermissionTable({ role }: { role: RoleDefinition }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-raised/60">
            <th className="whitespace-nowrap px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-ink-muted">
              Module
            </th>
            {actions.map((a) => (
              <th key={a.key} className="px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wide text-ink-muted">
                {a.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {permissionModules.map((mod) => (
            <tr key={mod}>
              <td className="whitespace-nowrap px-4 py-2.5 text-[13px] font-medium text-ink-primary">{mod}</td>
              {actions.map((a) => {
                const allowed = role.permissions[mod]?.[a.key];
                return (
                  <td key={a.key} className="px-3 py-2.5 text-center">
                    <span
                      className={cn(
                        "inline-flex h-5 w-5 items-center justify-center rounded",
                        allowed ? "bg-success-subtle text-success" : "text-ink-muted/50"
                      )}
                    >
                      {allowed ? <Check className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
