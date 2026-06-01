"use client"

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-slate-50 font-sans px-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
          <p className="text-sm text-slate-500 mb-6">
            {error.message || "A critical error occurred. Please reload the page."}
          </p>
          <button
            onClick={unstable_retry}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-2xl transition-colors text-sm"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
