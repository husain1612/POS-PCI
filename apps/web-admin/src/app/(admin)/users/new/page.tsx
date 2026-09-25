import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDivider, CardHeader } from "@/components/ui/Card";
import { Field, Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { outlets } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Create User" };

export default function CreateUserPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/users" className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-muted hover:text-ink-primary">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Users
      </Link>

      <PageHeader title="Create User" description="Add a new team member and assign them a role and outlet." />

      <Card>
        <CardHeader title="Account Details" description="This information is used for sign-in and outlet assignment." />
        <CardDivider />
        <CardContent className="pt-5">
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name" required>
                <Input name="name" placeholder="e.g. Putri Wulandari" autoComplete="name" />
              </Field>
              <Field label="Email" required>
                <Input type="email" name="email" placeholder="putri.wulandari@kopikenangan.id" autoComplete="email" />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Role" required hint="Determines module access via Roles & Permissions.">
                <Select name="role" defaultValue="Cashier">
                  <option>Admin</option>
                  <option>Outlet Manager</option>
                  <option>Cashier</option>
                </Select>
              </Field>
              <Field label="Outlet" required>
                <Select name="outlet" defaultValue="">
                  <option value="" disabled>
                    Select outlet…
                  </option>
                  <option>Head Office</option>
                  {outlets.map((o) => (
                    <option key={o.id}>{o.name}</option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Temporary Password" required hint="User will be asked to change this on first sign-in.">
                <Input type="password" name="password" placeholder="••••••••" />
              </Field>
              <Field label="Status">
                <Select name="status" defaultValue="active">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </Field>
            </div>

            <CardDivider />

            <div className="flex justify-end gap-2 pt-1">
              <Button variant="secondary" type="button" asChild>
                <Link href="/users">Cancel</Link>
              </Button>
              <Button type="submit">Create User</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
