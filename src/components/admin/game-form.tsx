"use client";

import Image from "next/image";
import Link from "next/link";
import { inputClass, labelClass, secondaryButtonClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";

type Game = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  imageUrl: string | null;
  tagline: string;
  status: string;
  serverName: string | null;
  serverIp: string | null;
  serverPort: string | null;
  serverIpBedrock: string | null;
  serverPortBedrock: string | null;
  order: number;
};

export function GameForm({ action, game }: { action: (formData: FormData) => Promise<void>; game?: Game }) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" required defaultValue={game?.name} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input name="slug" required defaultValue={game?.slug} placeholder="valorant" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Card Image</label>
        {game?.imageUrl && (
          <div className="relative mb-2 aspect-video w-full max-w-xs overflow-hidden rounded-sm border border-border">
            <Image src={game.imageUrl} alt="" fill className="object-cover" />
          </div>
        )}
        <input type="file" name="image" accept="image/*" className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Icon / Emoji</label>
          <input name="icon" required defaultValue={game?.icon} placeholder="🎯" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <input name="status" required defaultValue={game?.status ?? "Active"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input type="number" name="order" defaultValue={game?.order ?? 0} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Tagline</label>
        <input name="tagline" required defaultValue={game?.tagline} className={inputClass} />
      </div>

      <div className="space-y-4 rounded-sm border border-border p-4">
        <p className="text-xs uppercase tracking-widest text-muted">Minecraft server (only used on the "minecraft" slug)</p>

        <div>
          <label className={labelClass}>Server Display Name</label>
          <input name="serverName" defaultValue={game?.serverName ?? ""} placeholder="DemonCore MC" className={inputClass} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Java Edition IP</label>
            <input name="serverIp" defaultValue={game?.serverIp ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Java Edition Port (optional)</label>
            <input name="serverPort" defaultValue={game?.serverPort ?? ""} className={inputClass} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Bedrock Edition IP</label>
            <input name="serverIpBedrock" defaultValue={game?.serverIpBedrock ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Bedrock Edition Port</label>
            <input name="serverPortBedrock" defaultValue={game?.serverPortBedrock ?? ""} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <SubmitButton />
        <Link href="/admin/games" className={secondaryButtonClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
