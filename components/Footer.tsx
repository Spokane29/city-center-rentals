import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Address */}
          <div>
            <h3 className="font-semibold text-white mb-3">Location</h3>
            <p className="text-slate-400">
              29 E 6th Ave, Apt #203
              <br />
              Spokane, WA 99202
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-3">Contact</h3>
            <p className="text-slate-400 mb-2">
              <a
                href="tel:8886130442"
                className="hover:text-amber-500 transition-colors"
              >
                (888) 613-0442
              </a>
            </p>
            <p className="text-slate-400">
              <a
                href="mailto:hello@leasingvoice.com"
                className="hover:text-amber-500 transition-colors"
              >
                hello@leasingvoice.com
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="#contact-form"
                  className="hover:text-amber-500 transition-colors"
                >
                  Schedule Tour
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-amber-500 transition-colors"
                >
                  View Photos
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-amber-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-amber-500 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          © 2026 Mccoy Real Estate LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

