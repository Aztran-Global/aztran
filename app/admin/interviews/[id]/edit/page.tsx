import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { InterviewForm } from "@/components/admin/InterviewForm";
import type { Id } from "@/convex/_generated/dataModel";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditInterviewPage({
  params,
}: PageProps): Promise<ReactElement> {
  const { id } = await params;
  return (
    <div>
      <AdminTopbar title="Edit interview" />
      <div className="min-w-0 p-4 sm:p-6 md:p-8">
        <InterviewForm interviewId={id as Id<"interviews">} />
      </div>
    </div>
  );
}
