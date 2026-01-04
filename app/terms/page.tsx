import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions - City Center Apartments",
  description: "Terms & Conditions for City Center Apartments",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>

            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-slate-600 mb-12">Last Updated: January 2026</p>

            <div className="prose prose-slate max-w-none space-y-8">
              <p className="text-lg text-slate-700 leading-relaxed">
                By using this website, you agree to these terms.
              </p>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  INFORMATIONAL PURPOSE
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  This website provides information about rental property at 29 E 6th
                  Ave, Spokane, WA 99202. The information is for general purposes only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  NO LEASE AGREEMENT
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Submitting the contact form does not create a lease agreement or
                  guarantee apartment availability. All rentals are subject to application
                  approval and availability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  SMS CONSENT
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  By providing your phone number and submitting the form, you consent to
                  receive SMS messages related to your inquiry. You can opt out by
                  replying STOP to any message.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  ACCURACY OF INFORMATION
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We strive to keep information accurate and up-to-date. However:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Pricing may change without notice</li>
                  <li>Availability is subject to change</li>
                  <li>Photos may not reflect current unit condition</li>
                  <li>Features and amenities may vary</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  Contact us directly for current, accurate information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  FAIR HOUSING
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  We comply with all federal, state, and local fair housing laws. We do
                  not discriminate based on race, color, national origin, religion, sex,
                  familial status, disability, or any other protected class.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  LIMITATION OF LIABILITY
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  This website is provided &quot;as is&quot; without warranties of any kind. City Center
                  Rentals LLC is not liable for any damages arising from your use of
                  this website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  CONTACT US
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  City Center Rentals LLC
                  <br />
                  29 E 6th Ave
                  <br />
                  Spokane, WA 99202
                  <br />
                  Phone:{" "}
                  <a
                    href="tel:8886130442"
                    className="text-amber-500 hover:text-amber-600"
                  >
                    (888) 613-0442
                  </a>
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:hello@leasingvoice.com"
                    className="text-amber-500 hover:text-amber-600"
                  >
                    hello@leasingvoice.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

