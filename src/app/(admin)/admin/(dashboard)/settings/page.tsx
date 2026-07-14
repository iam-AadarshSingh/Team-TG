import { getSiteSettings } from "@/lib/queries";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">Site Settings</h1>
      <div className="mt-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
