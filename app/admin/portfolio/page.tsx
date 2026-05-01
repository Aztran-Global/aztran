import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { PortfolioAdminTable } from "@/components/admin/PortfolioAdminTable";
import { AdminPrimaryLink } from "@/components/admin/AdminPrimaryLink";

export default function AdminPortfolioPage(): ReactElement {
  return (
    <div>
      <AdminTopbar
        title="Portfolio"
        action={
          <AdminPrimaryLink href="/admin/portfolio/new">New Item</AdminPrimaryLink>
        }
      />
      <div className="min-w-0 p-4 sm:p-6 md:p-8">
        <PortfolioAdminTable />
      </div>
    </div>
  );
}
