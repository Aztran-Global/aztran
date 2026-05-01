import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { MarketReportsAdminTable } from "@/components/admin/MarketReportsAdminTable";
import { AdminPrimaryLink } from "@/components/admin/AdminPrimaryLink";

export default function AdminMarketReportsPage(): ReactElement {
  return (
    <div>
      <AdminTopbar
        title="Market reports"
        action={
          <AdminPrimaryLink href="/admin/market-reports/new">New report</AdminPrimaryLink>
        }
      />
      <div className="min-w-0 p-4 sm:p-6 md:p-8">
        <MarketReportsAdminTable />
      </div>
    </div>
  );
}
