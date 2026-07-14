"use client";

import Link from "next/link";
import Image from "next/image";
import { inputClass, labelClass, secondaryButtonClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";

type Creator = {
  id: string;
  photoUrl: string | null;
  inGameName: string;
  realName: string;
  bio: string | null;
  games: { id: string }[];
  order: number;
  active: boolean;
  youtube: string | null;
  instagram: string | null;
  twitch: string | null;
  discord: string | null;
  x: string | null;
};

export function CreatorForm({
  action,
  games,
  creator,
}: {
  action: (formData: FormData) => Promise<void>;
  games: { id: string; name: string; icon: string }[];
  creator?: Creator;
}) {
  const selectedGameIds = new Set(creator?.games.map((g) => g.id) ?? []);
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass}>Photo</label>
        {creator?.photoUrl && (
          <div className="relative mb-2 size-20 overflow-hidden rounded-sm border border-border">
            <Image src={creator.photoUrl} alt="" fill className="object-cover" />
          </div>
        )}
        <input type="file" name="photo" accept="image/*" className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>In-Game Name</label>
          <input name="inGameName" required defaultValue={creator?.inGameName} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Real Name</label>
          <input name="realName" required defaultValue={creator?.realName} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Games / Categories</label>
        <div className="flex flex-wrap gap-3 rounded-sm border border-border bg-background px-3 py-3">
          {games.map((g) => (
            <label key={g.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="gameIds"
                value={g.id}
                defaultChecked={selectedGameIds.has(g.id)}
              />
              {g.icon} {g.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Order</label>
        <input type="number" name="order" defaultValue={creator?.order ?? 0} className={`${inputClass} max-w-32`} />
      </div>

      <div>
        <label className={labelClass}>Bio</label>
        <textarea name="bio" rows={3} defaultValue={creator?.bio ?? ""} className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>YouTube</label>
          <input name="youtube" defaultValue={creator?.youtube ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Instagram</label>
          <input name="instagram" defaultValue={creator?.instagram ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Twitch</label>
          <input name="twitch" defaultValue={creator?.twitch ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Discord</label>
          <input name="discord" defaultValue={creator?.discord ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>X</label>
          <input name="x" defaultValue={creator?.x ?? ""} className={inputClass} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={creator?.active ?? true} />
        Active (visible on site)
      </label>

      <div className="flex gap-3 pt-2">
        <SubmitButton />
        <Link href="/admin/creators" className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
