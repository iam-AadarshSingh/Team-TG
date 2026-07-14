"use client";

import { useActionState } from "react";
import { inputClass, labelClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateSiteSettings, type SettingsState } from "@/app/actions/settings";

type SiteSettings = {
  twitterUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  twitchUrl: string | null;
  discordInvite: string | null;
  statCreators: string;
  statCommunity: string;
  statHoursLive: string;
};

const initialState: SettingsState = { message: "" };

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction] = useActionState(updateSiteSettings, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      <div>
        <h2 className="font-display text-lg uppercase tracking-wide">Social Links</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>X (Twitter)</label>
            <input name="twitterUrl" defaultValue={settings.twitterUrl ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Instagram</label>
            <input name="instagramUrl" defaultValue={settings.instagramUrl ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>YouTube</label>
            <input name="youtubeUrl" defaultValue={settings.youtubeUrl ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Discord Invite</label>
            <input name="discordInvite" defaultValue={settings.discordInvite ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Twitch</label>
            <input name="twitchUrl" defaultValue={settings.twitchUrl ?? ""} className={inputClass} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg uppercase tracking-wide">Homepage Stats</h2>
        <p className="mt-1 text-xs text-muted">
          Free text — supports suffixes like &quot;5000+&quot;. The numeric part animates on the homepage.
          Games and Sponsors counts are pulled automatically from your Games/Sponsors lists, so there's
          nothing to edit for those.
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Creators</label>
            <input name="statCreators" required defaultValue={settings.statCreators} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Community</label>
            <input name="statCommunity" required defaultValue={settings.statCommunity} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Hours Live</label>
            <input name="statHoursLive" required defaultValue={settings.statHoursLive} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SubmitButton />
        {state.message && <span className="text-sm text-accent">{state.message}</span>}
      </div>
    </form>
  );
}
