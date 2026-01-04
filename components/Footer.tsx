import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 py-8 sm:py-10 lg:py-12">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        {/* Mobile: Stacked layout with larger touch targets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Contact - First on mobile */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-white mb-3 text-base">Contact</h3>
            <p className="text-sm text-white font-medium mb-3">
              City Center Rentals LLC
            </p>
            <a
              href="tel:8886130442"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 active:text-amber-500 transition-colors touch-manipulation text-lg font-semibold py-2"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (888) 613-0442
            </a>
          </div>

          {/* Address */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-white mb-3 text-base">Location</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              29 E 6th Ave, Apt #203
              <br />
              Spokane, WA 99202
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=29+E+6th+Ave,+Spokane,+WA+99202"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 text-sm mt-2 py-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-white mb-3 text-base">Quick Links</h3>
            <div className="flex justify-center sm:flex-col gap-4 sm:gap-0">
              <Link
                href="/privacy"
                className="text-slate-400 hover:text-amber-400 active:text-amber-500 transition-colors touch-manipulation text-sm py-2 sm:py-1"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-400 hover:text-amber-400 active:text-amber-500 transition-colors touch-manipulation text-sm py-2 sm:py-1"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-5 sm:pt-6 text-center text-slate-500 text-xs">
          © 2026 City Center Rentals LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

