import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { InsightsAdminTable } from "@/components/admin/InsightsAdminTable";
import { AdminPrimaryLink } from "@/components/admin/AdminPrimaryLink";

export default function AdminInsightsPage(): ReactElement {
  return (
    <div>
      <AdminTopbar
        title="Insights"
        action={<AdminPrimaryLink href="/admin/insights/new">New insight</AdminPrimaryLink>}
      />
      <div className="min-w-0 p-4 sm:p-6 md:p-8">
        <InsightsAdminTable />
      </div>
    </div>
  );
}
