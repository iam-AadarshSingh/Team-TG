export function AdminLoading() {
  return (
    <div>
      <div className="h-9 w-48 animate-pulse rounded-sm bg-surface" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-sm bg-surface" />
        ))}
      </div>
      <div className="mt-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-sm bg-surface" />
        ))}
      </div>
    </div>
  );
}
