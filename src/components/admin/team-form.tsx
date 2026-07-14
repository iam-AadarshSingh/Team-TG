"use client";

import Link from "next/link";
import Image from "next/image";
import { inputClass, labelClass, secondaryButtonClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";

type TeamMember = {
  id: string;
  photoUrl: string | null;
  inGameName: string;
  realName: string;
  role: string;
  order: number;
  active: boolean;
};

export function TeamForm({
  action,
  member,
}: {
  action: (formData: FormData) => Promise<void>;
  member?: TeamMember;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass}>Photo</label>
        {member?.photoUrl && (
          <div className="relative mb-2 size-20 overflow-hidden rounded-sm border border-border">
            <Image src={member.photoUrl} alt="" fill className="object-cover" />
          </div>
        )}
        <input type="file" name="photo" accept="image/*" className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>In-Game Name</label>
          <input name="inGameName" required defaultValue={member?.inGameName} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Real Name</label>
          <input name="realName" required defaultValue={member?.realName} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Role</label>
          <input name="role" required defaultValue={member?.role} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input type="number" name="order" defaultValue={member?.order ?? 0} className={inputClass} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={member?.active ?? true} />
        Active (visible on site)
      </label>

      <div className="flex gap-3 pt-2">
        <SubmitButton />
        <Link href="/admin/team" className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
