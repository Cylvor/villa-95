import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-stone-100 px-6 py-24 md:px-12 text-stone-900">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-4">
          404
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
          Page not found.
        </h1>
        <p className="mt-6 text-stone-600 text-base md:text-lg leading-relaxed">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-emerald-700 hover:scale-[1.02]"
          >
            Back to Home
          </Link>
          <Link
            href="/reservations"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-stone-900 border border-stone-200 transition-all hover:border-stone-300 hover:bg-stone-50"
          >
            Reservations
          </Link>
        </div>
      </div>
    </main>
  );
}
