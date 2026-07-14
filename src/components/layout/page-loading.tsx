export function PageLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="h-4 w-32 animate-pulse rounded-sm bg-surface" />
      <div className="mt-3 h-12 w-72 animate-pulse rounded-sm bg-surface" />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-sm bg-surface" />
        ))}
      </div>
    </div>
  );
}
