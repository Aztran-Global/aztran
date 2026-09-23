import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { MarketRecapsAdminTable } from "@/components/admin/MarketRecapsAdminTable";
import { AdminPrimaryLink } from "@/components/admin/AdminPrimaryLink";

export default function AdminMarketRecapsPage(): ReactElement {
  return (
    <div>
      <AdminTopbar
        title="Market Recaps"
        action={
          <AdminPrimaryLink href="/admin/market-recaps/new">
            New market recap
          </AdminPrimaryLink>
        }
      />
      <div className="min-w-0 p-4 sm:p-6 md:p-8">
        <MarketRecapsAdminTable />
      </div>
    </div>
  );
}
