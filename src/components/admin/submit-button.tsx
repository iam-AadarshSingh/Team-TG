"use client";

import { useFormStatus } from "react-dom";
import { buttonClass } from "@/components/admin/ui";

export function SubmitButton({ label = "Save" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={buttonClass}>
      {pending ? "Saving…" : label}
    </button>
  );
}
