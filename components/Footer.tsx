import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Address */}
          <div>
            <h3 className="font-semibold text-white mb-2 sm:mb-3 text-base sm:text-lg">Location</h3>
            <p className="text-sm sm:text-base text-slate-400">
              29 E 6th Ave, Apt #203
              <br />
              Spokane, WA 99202
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-2 sm:mb-3 text-base sm:text-lg">Contact</h3>
            <p className="text-sm sm:text-base text-white font-medium mb-2">
              City Center Rentals LLC
            </p>
            <p className="text-sm sm:text-base text-slate-400 mb-2">
              <a
                href="tel:8886130442"
                className="hover:text-amber-500 transition-colors touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                (888) 613-0442
              </a>
            </p>
            <p className="text-sm sm:text-base text-slate-400">
              <a
                href="mailto:hello@leasingvoice.com"
                className="hover:text-amber-500 transition-colors touch-manipulation break-all"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                hello@leasingvoice.com
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-semibold text-white mb-2 sm:mb-3 text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-400">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-amber-500 transition-colors touch-manipulation inline-block min-h-[44px] flex items-center"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-amber-500 transition-colors touch-manipulation inline-block min-h-[44px] flex items-center"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-6 sm:pt-8 text-center text-slate-500 text-xs sm:text-sm">
          © 2026 City Center Rentals LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

