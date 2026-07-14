import { createCareerOpening } from "@/app/actions/careers";
import { CareerForm } from "@/components/admin/career-form";

export default function NewCareerOpeningPage() {
  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">New Opening</h1>
      <div className="mt-8">
        <CareerForm action={createCareerOpening} />
      </div>
    </div>
  );
}
