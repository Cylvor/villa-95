import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Villa 95 Rangala",
  description:
    "Privacy Policy for Villa 95 Rangala, including how we collect, use, and protect personal information.",
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
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
            <a
              href="https://www.booking.com/hotel/lk/villa-95-kandy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex rounded-full bg-stone-900 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-700"
            >
              Book Now
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-10 shadow-sm">
          <p className="text-sm text-stone-600 leading-relaxed">
            This Privacy Policy explains how Villa 95 Rangala ("Villa 95", "we", "us")—operated by A1
            overseas consultants (pvt) ltd—collects, uses, shares, and protects personal information when
            you visit our website, contact us, or make a reservation.
          </p>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Who we are</h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-2">
              <p>
                Property: <span className="font-medium text-stone-800">Villa 95 Rangala</span>
              </p>
              <p>
                Address: No.95 Bobebila Makuldeniya Rd, Kandy 20921, Sri Lanka
              </p>
              <p>
                Email: <a className="underline hover:text-emerald-700" href="mailto:info@villa95.com">info@villa95.com</a>
              </p>
              <p>
                Phone: <a className="underline hover:text-emerald-700" href="tel:+94770000000">+94 77 000 0000</a>
              </p>
              <p>
                WhatsApp: <a className="underline hover:text-emerald-700" href="https://wa.me/94773864650" target="_blank" rel="noopener noreferrer">+94 77 386 4650</a>
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Information we collect</h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                We collect information in the following ways:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium text-stone-800">Information you provide</span>: your name, email address,
                  phone number, travel dates, number of guests, preferences (e.g., meal requests), and messages when you
                  contact us by email/WhatsApp or through booking platforms.
                </li>
                <li>
                  <span className="font-medium text-stone-800">Reservation details</span>: booking reference, room type,
                  stay dates, special requests, and communication history.
                </li>
                <li>
                  <span className="font-medium text-stone-800">Device and usage data</span>: basic log information such as
                  IP address, browser type, pages viewed, and approximate location inferred from IP. This helps us keep the
                  site secure and understand usage.
                </li>
                <li>
                  <span className="font-medium text-stone-800">Cookies and similar technologies</span>: we may use cookies
                  for essential site functionality and to improve performance. You can control cookies through your browser
                  settings.
                </li>
              </ul>
              <p>
                We do not ask you to submit sensitive personal information (e.g., health information) through the website.
                If you choose to share it with us for accommodation purposes, we will handle it with additional care.
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">How we use your information</h2>
            <div className="text-sm text-stone-600 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>To respond to your inquiries and provide customer support.</li>
                <li>To process and manage reservations, including check-in coordination.</li>
                <li>To provide requested services (e.g., meal planning, driver accommodation arrangements).</li>
                <li>To send important service messages about your booking (not marketing spam).</li>
                <li>To maintain safety, prevent fraud, and secure our website.</li>
                <li>To improve our website and guest experience.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Sharing and third parties</h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                We may share information only when needed to provide services or comply with legal obligations. Examples:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium text-stone-800">Booking platforms</span> (e.g., Booking.com) if you book or
                  message us through them.
                </li>
                <li>
                  <span className="font-medium text-stone-800">Communication providers</span> (e.g., WhatsApp) when you
                  contact us through those services.
                </li>
                <li>
                  <span className="font-medium text-stone-800">Maps</span>: our site may embed Google Maps for directions
                  and location viewing.
                </li>
              </ul>
              <p>
                Third-party services have their own privacy policies, and your use of those services is governed by their
                terms.
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Data retention</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We retain personal information only as long as reasonably necessary for booking administration, recordkeeping,
              legal compliance, and dispute resolution. Retention periods may vary depending on the type of information and
              how it was collected.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Security</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We use reasonable administrative and technical safeguards to protect your information. No method of
              transmission over the internet is 100% secure, so we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Your choices</h2>
            <div className="text-sm text-stone-600 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>You can request access, correction, or deletion of your personal information by contacting us.</li>
                <li>You can control cookies through your browser settings.</li>
                <li>
                  If you booked through a third-party platform, you may also manage some information directly with that
                  platform.
                </li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Children’s privacy</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Our services are intended for travelers and families. We do not knowingly collect personal information from
              children without parental involvement. If you believe a child has provided us personal information, contact
              us and we will take appropriate steps.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Changes to this policy</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will update the effective date at the top of this
              page when changes are made.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wide text-stone-900">Contact</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              For privacy questions or requests, email us at{" "}
              <a className="underline hover:text-emerald-700" href="mailto:info@villa95.com">
                info@villa95.com
              </a>
              .
            </p>
            <p className="mt-2 text-xs text-stone-400">
              This page is provided for general information and does not constitute legal advice.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
