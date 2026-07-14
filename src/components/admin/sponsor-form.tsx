"use client";

import Link from "next/link";
import Image from "next/image";
import { inputClass, labelClass, secondaryButtonClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";

type Sponsor = {
  id: string;
  logoUrl: string | null;
  name: string;
  tier: string;
  description: string | null;
  subtitle: string | null;
  perks: string[];
  link: string | null;
  order: number;
};

export function SponsorForm({
  action,
  sponsor,
}: {
  action: (formData: FormData) => Promise<void>;
  sponsor?: Sponsor;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass}>Logo</label>
        {sponsor?.logoUrl && (
          <div className="relative mb-2 size-20 overflow-hidden rounded-sm border border-border bg-black/40">
            <Image src={sponsor.logoUrl} alt="" fill className="object-contain p-2" />
          </div>
        )}
        <input type="file" name="logo" accept="image/*" className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" required defaultValue={sponsor?.name} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Tier</label>
          <input name="tier" required defaultValue={sponsor?.tier} placeholder="Gaming Partner" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" rows={3} defaultValue={sponsor?.description ?? ""} className={inputClass} />
      </div>

      <div className="space-y-4 rounded-sm border border-border p-4">
        <p className="text-xs uppercase tracking-widest text-muted">
          Expandable partner details (shown on the Sponsors page)
        </p>
        <div>
          <label className={labelClass}>Subtitle</label>
          <input
            name="subtitle"
            defaultValue={sponsor?.subtitle ?? ""}
            placeholder="// Leveling Up Indian Gaming"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Perks (one per line)</label>
          <textarea
            name="perks"
            rows={4}
            defaultValue={sponsor?.perks.join("\n") ?? ""}
            placeholder={"Featured partner across all official content\nCo-branded campaigns"}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Official Link</label>
          <input name="link" defaultValue={sponsor?.link ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input type="number" name="order" defaultValue={sponsor?.order ?? 0} className={inputClass} />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <SubmitButton />
        <Link href="/admin/sponsors" className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
