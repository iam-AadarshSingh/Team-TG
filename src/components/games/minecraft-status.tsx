import type { MinecraftStatus } from "@/lib/minecraft";

export function MinecraftStatusSkeleton() {
  return (
    <div className="mb-10 animate-pulse space-y-3 rounded-sm border border-border bg-surface/40 p-6">
      <div className="h-6 w-56 rounded-sm bg-black/30" />
      <div className="h-16 rounded-sm bg-black/30" />
      <div className="h-16 rounded-sm bg-black/30" />
    </div>
  );
}

type Edition = { label: string; icon: string; ip: string; port: string | null; status: MinecraftStatus };

function EditionRow({ edition }: { edition: Edition }) {
  const { label, icon, ip, port, status } = edition;
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-4 first:border-t-0">
      <div>
        <p className="text-sm font-semibold">
          {icon} {label}
        </p>
        <p className="mt-1 font-display text-lg tracking-wide">
          {ip}
          {port ? `:${port}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="relative flex size-2.5">
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${
              status.online ? "animate-ping bg-green-500" : "bg-red-500"
            } opacity-75`}
          />
          <span className={`relative inline-flex size-2.5 rounded-full ${status.online ? "bg-green-500" : "bg-red-500"}`} />
        </span>
        <span className="text-sm uppercase tracking-widest">{status.online ? "Online" : "Offline"}</span>
      </div>

      {status.online && status.players && (
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Players</p>
          <p className="mt-1 font-display text-lg text-accent">
            {status.players.online} / {status.players.max}
          </p>
        </div>
      )}
    </div>
  );
}

export function MinecraftStatusWidget({
  serverName,
  java,
  bedrock,
}: {
  serverName: string;
  java: Edition;
  bedrock: Edition | null;
}) {
  return (
    <div className="mb-10 rounded-sm border border-border bg-surface/40 p-6">
      <p className="font-display text-xl uppercase tracking-wide">{serverName} Server IP &amp; Port 🎮</p>
      <EditionRow edition={java} />
      {bedrock && <EditionRow edition={bedrock} />}
    </div>
  );
}
