export function LoadingSpinner({ text = 'Loading…' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-3 py-4">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-700 border-t-transparent" />
      <span className="text-muted">{text}</span>
    </div>
  )
}

