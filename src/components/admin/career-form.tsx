"use client";

import Link from "next/link";
import { inputClass, labelClass, secondaryButtonClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";

type CareerOpening = {
  id: string;
  title: string;
  description: string;
  department: string;
  applyLink: string | null;
  order: number;
  isOpen: boolean;
};

export function CareerForm({
  action,
  opening,
}: {
  action: (formData: FormData) => Promise<void>;
  opening?: CareerOpening;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Title</label>
          <input name="title" required defaultValue={opening?.title} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Department</label>
          <input name="department" required defaultValue={opening?.department} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" required rows={4} defaultValue={opening?.description} className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Apply Link (optional — defaults to Contact page)</label>
          <input name="applyLink" defaultValue={opening?.applyLink ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input type="number" name="order" defaultValue={opening?.order ?? 0} className={inputClass} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isOpen" defaultChecked={opening?.isOpen ?? true} />
        Open (visible on site)
      </label>

      <div className="flex gap-3 pt-2">
        <SubmitButton />
        <Link href="/admin/careers" className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
