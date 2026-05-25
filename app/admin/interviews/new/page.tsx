import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { InterviewForm } from "@/components/admin/InterviewForm";

export default function NewInterviewPage(): ReactElement {
  return (
    <div>
      <AdminTopbar title="New interview" />
      <div className="min-w-0 p-4 sm:p-6 md:p-8">
        <InterviewForm />
      </div>
    </div>
  );
}
