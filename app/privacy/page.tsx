import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy - City Center Apartments",
  description: "Privacy Policy for City Center Apartments",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <div className="bg-white py-16 overflow-x-hidden">
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
              Privacy Policy
            </h1>
            <p className="text-slate-600 mb-12">Last Updated: January 2026</p>

            <div className="prose prose-slate max-w-none space-y-8">
              <p className="text-lg text-slate-700 leading-relaxed">
                City Center Apartments, managed by City Center Rentals LLC, respects
                your privacy. This policy explains how we collect, use, and protect
                your information.
              </p>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  INFORMATION WE COLLECT
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  When you submit our contact form, we collect:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Email address (if provided)</li>
                  <li>Property preferences</li>
                  <li>Desired move-in date</li>
                  <li>Any questions you submit</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  HOW WE USE YOUR INFORMATION
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Respond to your inquiry</li>
                  <li>Schedule property tours</li>
                  <li>Send SMS messages about your inquiry and the property</li>
                  <li>Follow up about your housing needs</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  SMS MESSAGING
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  By submitting the contact form with your phone number, you consent
                  to receive SMS messages from us regarding your inquiry. Message
                  frequency varies. Message and data rates may apply. Reply STOP to opt
                  out at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  COOKIES AND TRACKING
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Analyze website traffic</li>
                  <li>Measure advertising effectiveness (Facebook Pixel)</li>
                  <li>Improve our website</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  DATA PROTECTION
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  We take reasonable measures to protect your personal information from
                  unauthorized access or disclosure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                  YOUR RIGHTS
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  You may request to:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Access the information we have about you</li>
                  <li>Delete your information from our records</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  To make a request, contact us at:
                </p>
                <p className="text-slate-700 leading-relaxed mt-2">
                  Email:{" "}
                  <a
                    href="mailto:hello@leasingvoice.com"
                    className="text-amber-500 hover:text-amber-600"
                  >
                    hello@leasingvoice.com
                  </a>
                  <br />
                  Phone:{" "}
                  <a
                    href="tel:8886130442"
                    className="text-amber-500 hover:text-amber-600"
                  >
                    (888) 613-0442
                  </a>
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

