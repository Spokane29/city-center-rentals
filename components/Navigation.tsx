"use client";

import { useState, useEffect } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        isScrolled
          ? "bg-slate-800 shadow-lg py-2 sm:py-3"
          : "bg-slate-800/95 backdrop-blur-sm py-2.5 sm:py-4"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo - Different text for mobile vs desktop */}
          <div className="flex-1 min-w-0">
            {/* Mobile: Short version */}
            <div className="sm:hidden text-sm font-bold text-white leading-tight">
              <div>4spokane.com</div>
              <div className="text-amber-400 text-xs font-medium">City Center Apartments</div>
            </div>
            {/* Desktop: Full version */}
            <div className="hidden sm:block text-base md:text-lg lg:text-xl font-bold text-white truncate">
              4spokane.com City Center Apartments - Close to Everything
            </div>
          </div>

          {/* Right side - Phone */}
          <div className="flex items-center flex-shrink-0">
            {/* Desktop: Full phone with text */}
            <a
              href="tel:8886130442"
              className="hidden sm:flex items-center gap-2 text-white hover:text-amber-400 transition-colors touch-manipulation bg-slate-700/50 hover:bg-slate-700 px-3 py-2 rounded-lg"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="font-medium text-sm md:text-base">(888) 613-0442</span>
            </a>

            {/* Mobile: Call button with icon */}
            <a
              href="tel:8886130442"
              className="sm:hidden flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-900 font-semibold px-3 py-2 rounded-lg transition-colors touch-manipulation min-h-[44px]"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-sm">Call</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

