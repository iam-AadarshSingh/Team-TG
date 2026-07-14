"use client";

import { use } from "react";
import { MinecraftStatusWidget } from "@/components/games/minecraft-status";
import type { MinecraftStatus } from "@/lib/minecraft";

export function MinecraftStatusResolved({
  serverName,
  javaIp,
  javaPort,
  javaPromise,
  bedrockIp,
  bedrockPort,
  bedrockPromise,
}: {
  serverName: string;
  javaIp: string;
  javaPort: string | null;
  javaPromise: Promise<MinecraftStatus>;
  bedrockIp: string | null;
  bedrockPort: string | null;
  bedrockPromise: Promise<MinecraftStatus> | null;
}) {
  const javaStatus = use(javaPromise);
  const bedrockStatus = bedrockPromise ? use(bedrockPromise) : null;

  return (
    <MinecraftStatusWidget
      serverName={serverName}
      java={{ label: "Java Edition", icon: "🖥️", ip: javaIp, port: javaPort, status: javaStatus }}
      bedrock={
        bedrockIp && bedrockStatus
          ? { label: "Bedrock Edition", icon: "📱", ip: bedrockIp, port: bedrockPort, status: bedrockStatus }
          : null
      }
    />
  );
}
