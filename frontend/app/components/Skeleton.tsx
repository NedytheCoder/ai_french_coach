export function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div className={`h-4 bg-slate-200 rounded-full animate-pulse ${className}`} />
  )
}

export function SkeletonPairCard() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4 animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-24 bg-slate-200 rounded-full" />
            <div className="h-3 w-4 bg-slate-100 rounded-full" />
            <div className="h-5 w-20 bg-slate-200 rounded-full" />
          </div>
          <div className="flex gap-2">
            <div className="h-4 w-10 bg-slate-100 rounded-full" />
            <div className="h-4 w-20 bg-slate-100 rounded-full" />
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="h-6 w-16 bg-slate-200 rounded-full" />
          <div className="h-3 w-12 bg-slate-100 rounded-full ml-auto" />
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="h-2 w-full bg-slate-100 rounded-full" />
        <div className="h-2 bg-slate-100 rounded-full" style={{ width: "68%" }} />
      </div>
      <div className="h-10 bg-slate-100 rounded-2xl" />
    </div>
  )
}

export function SkeletonListItem() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4 animate-pulse">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 bg-slate-200 rounded-full" />
          <div className="h-3 w-4 bg-slate-100 rounded-full" />
          <div className="h-5 w-20 bg-slate-200 rounded-full" />
        </div>
        <div className="flex gap-2">
          <div className="h-4 w-8 bg-slate-100 rounded-full" />
          <div className="h-4 w-16 bg-slate-100 rounded-full" />
        </div>
      </div>
      <div className="h-8 w-28 bg-slate-100 rounded-xl shrink-0" />
    </div>
  )
}
