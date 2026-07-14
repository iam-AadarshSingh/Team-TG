"use client";

import { useTransition } from "react";
import { dangerButtonClass } from "@/components/admin/ui";

export function DeleteButton({
  action,
  label = "Delete",
  confirmMessage = "Delete this item? This cannot be undone.",
}: {
  action: () => Promise<void>;
  label?: string;
  confirmMessage?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(confirmMessage)) return;
        startTransition(() => {
          action();
        });
      }}
      className={dangerButtonClass}
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}
