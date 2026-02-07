import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Villa 95 Rangala",
  description:
    "Terms of Service for Villa 95 Rangala covering bookings, payments, house rules, and website usage.",
};

export default function TermsOfServicePage() {
  const effectiveDate = "January 25, 2026";

  return (
    <div className="min-h-screen bg-mist-cream text-stone-900">
      <header className="border-b border-stone-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-700">
              Legal
            </p>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-1 text-sm text-stone-500">Effective date: {effectiveDate}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-stone-200 bg-white px-5 py-2 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-50"
            >
              Back Home
            </Link>
            <Link
              href="/reservations"
              className="hidden sm:inline-flex rounded-full bg-stone-900 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-700"
            >
              Book Now
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-10 shadow-sm">
          <p className="text-sm text-stone-600 leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) govern your use of the Villa 95 Rangala website and your stay (or intended
            stay) at Villa 95 Rangala (&quot;Villa 95&quot;, &quot;we&quot;, &quot;us&quot;), operated by A1 overseas consultants (pvt) ltd. By using
            our website or making a reservation, you agree to these Terms.
          </p>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Reservations</h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                Reservations may be made via third-party booking platforms (such as Booking.com) or by contacting us
                directly.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Rates, inclusions, and cancellation rules may vary by room type and booking channel.</li>
                <li>
                  If you book through a third-party platform, that platform’s policies apply in addition to these Terms.
                </li>
                <li>
                  You are responsible for providing accurate guest details and keeping your contact information up to date.
                </li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Check-in and check-out</h2>
            <div className="text-sm text-stone-600 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>Check-in: 10:00 AM – 6:00 PM (please share your arrival time in advance).</li>
                <li>Check-out: by 11:00 AM.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Payments</h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                Cash payments are preferred at the property. Online prepayments, card handling, and deposits may differ
                depending on your booking platform and selected rate.
              </p>
              <p>
                If a security deposit applies, you will be informed at or before check-in.
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Cancellations and changes</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Cancellation and modification policies vary by room type and booking source. Please review the conditions
              shown when selecting your dates. If you booked directly, we will confirm the applicable policy in writing.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">House rules</h2>
            <div className="text-sm text-stone-600 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>Quiet hours: 10:00 PM – 7:00 AM.</li>
                <li>Children of all ages are welcome. Cribs/extra beds are not provided.</li>
                <li>Pets are not allowed.</li>
                <li>
                  Please treat the property and its furnishings with care. You may be charged for damage beyond normal wear.
                </li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Driver accommodation</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We can provide accommodation and meals for private drivers at a nominal charge, subject to availability.
              Please request this in advance.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Website use</h2>
            <div className="text-sm text-stone-600 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>You may use this website for lawful purposes only.</li>
                <li>
                  You agree not to attempt to disrupt the website, probe security, or misuse forms/links.
                </li>
                <li>
                  Content is provided for general information and may be updated without notice.
                </li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Liability</h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                To the extent permitted by law, Villa 95 is not liable for indirect or consequential losses. Guests are
                responsible for their personal belongings and travel arrangements.
              </p>
              <p>
                The Knuckles Mountain Range is a natural environment. Please take reasonable precautions when exploring
                outdoor areas, trails, or uneven terrain.
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Governing law</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              These Terms are governed by the laws of Sri Lanka. If a dispute arises, we encourage you to contact us first
              so we can try to resolve it quickly.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Contact</h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-2">
              <p>
                Email: <a className="underline hover:text-emerald-700" href="mailto:info@villa95.com">info@villa95.com</a>
              </p>
              <p>
                Phone: <a className="underline hover:text-emerald-700" href="tel:+94773864650">+94 77 386 4650</a>
              </p>
              <p>
                Address: No.95 Bobabila Makuldeniya Rd, Kandy 20921, Sri Lanka
              </p>
              <p className="pt-2 text-xs text-stone-400">
                This page is provided for general information and does not constitute legal advice.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
