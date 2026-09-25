import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDivider, CardHeader } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Field, Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "System Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="System Settings" description="Organization-wide configuration for the POS ecosystem." />

      <Card>
        <CardContent className="pt-5">
          <Tabs
            items={[
              { key: "general", label: "General", content: <GeneralSettings /> },
              { key: "notifications", label: "Notifications", content: <NotificationSettings /> },
              { key: "security", label: "Security", content: <SecuritySettings /> },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function GeneralSettings() {
  return (
    <form className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Business Name" required>
          <Input defaultValue="Kopi Kenangan Group" />
        </Field>
        <Field label="Legal Entity" required>
          <Input defaultValue="PT Kopi Kenangan Nusantara" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Currency">
          <Select defaultValue="IDR">
            <option value="IDR">IDR — Indonesian Rupiah</option>
          </Select>
        </Field>
        <Field label="Timezone">
          <Select defaultValue="WIB">
            <option value="WIB">WIB — Asia/Jakarta (GMT+7)</option>
            <option value="WITA">WITA — Asia/Makassar (GMT+8)</option>
            <option value="WIT">WIT — Asia/Jayapura (GMT+9)</option>
          </Select>
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Default Tax Rate (PPN)" hint="Applied to new outlets unless overridden.">
          <Input defaultValue="11" type="number" />
        </Field>
        <Field label="Receipt Footer Note">
          <Input defaultValue="Terima kasih telah berbelanja!" />
        </Field>
      </div>
      <CardDivider />
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}

function NotificationSettings() {
  const items = [
    { label: "Low stock alerts", description: "Notify when a product falls below its minimum stock.", checked: true },
    { label: "Out of stock alerts", description: "Notify immediately when a product reaches zero stock.", checked: true },
    { label: "Refund requests", description: "Notify admins when a cashier submits a refund for approval.", checked: true },
    { label: "Stock opname approvals", description: "Notify when a stock opname is awaiting your approval.", checked: true },
    { label: "Sync failures", description: "Notify when offline transactions fail to synchronize.", checked: true },
    { label: "System alerts", description: "Maintenance windows and platform-level announcements.", checked: false },
  ];
  return (
    <div className="divide-y divide-border">
      {items.map((item) => (
        <label key={item.label} className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
          <div>
            <p className="text-[13px] font-medium text-ink-primary">{item.label}</p>
            <p className="mt-0.5 text-xs text-ink-muted">{item.description}</p>
          </div>
          <input
            type="checkbox"
            defaultChecked={item.checked}
            className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-[hsl(var(--brand))]"
          />
        </label>
      ))}
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-md border border-border p-4">
        <div>
          <p className="text-[13px] font-medium text-ink-primary">Two-factor authentication</p>
          <p className="mt-0.5 text-xs text-ink-muted">Require a one-time code for Admin and Owner sign-ins.</p>
        </div>
        <Button variant="secondary" size="sm">
          Enable
        </Button>
      </div>
      <div className="flex items-center justify-between rounded-md border border-border p-4">
        <div>
          <p className="text-[13px] font-medium text-ink-primary">Session timeout</p>
          <p className="mt-0.5 text-xs text-ink-muted">Automatically sign out inactive sessions.</p>
        </div>
        <Select className="w-40" defaultValue="60">
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="480">8 hours</option>
        </Select>
      </div>
      <div className="flex items-center justify-between rounded-md border border-border p-4">
        <div>
          <p className="text-[13px] font-medium text-ink-primary">Audit log retention</p>
          <p className="mt-0.5 text-xs text-ink-muted">How long audit trail entries are kept before archival.</p>
        </div>
        <Select className="w-40" defaultValue="365">
          <option value="90">90 days</option>
          <option value="180">180 days</option>
          <option value="365">1 year</option>
        </Select>
      </div>
    </div>
  );
}
