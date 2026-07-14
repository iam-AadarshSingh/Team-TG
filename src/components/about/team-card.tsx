import Image from "next/image";

export function TeamCard({
  member,
}: {
  member: { id: string; photoUrl: string | null; inGameName: string; realName: string; role: string };
}) {
  return (
    <div className="group relative overflow-hidden rounded-sm border border-border bg-surface/40 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_20px_50px_-20px_rgba(255,107,0,0.45)]">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      <div className="relative mx-auto mt-6 size-28 overflow-hidden rounded-full border border-border bg-black/40 transition-transform duration-300 group-hover:scale-105">
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={member.inGameName}
            fill
            loading="lazy"
            className="object-cover"
            sizes="112px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-2xl text-border">
            {member.inGameName.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg uppercase tracking-wide">{member.inGameName}</h3>
        <p className="text-xs uppercase tracking-widest text-muted">{member.realName}</p>
        <p className="mt-2 text-sm text-accent">{member.role}</p>
      </div>
    </div>
  );
}
