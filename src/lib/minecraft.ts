export type MinecraftStatus = {
  online: boolean;
  players?: { online: number; max: number };
  version?: string;
};

export async function getMinecraftStatus(
  ip: string,
  port?: string | null,
  edition: "java" | "bedrock" = "java"
): Promise<MinecraftStatus> {
  const address = port ? `${ip}:${port}` : ip;
  const base = edition === "bedrock" ? "https://api.mcsrvstat.us/bedrock/3" : "https://api.mcsrvstat.us/3";
  try {
    const res = await fetch(`${base}/${address}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { online: false };
    const data = await res.json();
    return {
      online: Boolean(data.online),
      players: data.players ? { online: data.players.online ?? 0, max: data.players.max ?? 0 } : undefined,
      version: data.version,
    };
  } catch {
    return { online: false };
  }
}
