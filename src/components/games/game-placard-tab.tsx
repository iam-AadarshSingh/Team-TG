import Image from "next/image";

export function GamePlacardTab({
  label,
  icon,
  imageUrl,
  isActive,
  onClick,
}: {
  label: string;
  icon: string;
  imageUrl?: string | null;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative aspect-[4/3] overflow-hidden rounded-sm border transition-all duration-300 ${
        isActive
          ? "border-accent shadow-[0_0_0_1px_var(--accent),0_20px_50px_-20px_rgba(255,107,0,0.6)]"
          : "border-border opacity-60 hover:opacity-100"
      }`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={label}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="200px"
        />
      ) : (
        <div className="absolute inset-0 bg-surface/40" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-3 text-left">
        <span className="block text-lg">{icon}</span>
        <span className="mt-0.5 block font-display text-sm uppercase tracking-wide text-white sm:text-base">
          {label}
        </span>
      </span>
    </button>
  );
}
