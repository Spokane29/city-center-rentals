"use client";

import Image from "next/image";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/property/Living.jpeg"
          alt="City Center Apartments Living Room"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/55"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Downtown Spokane Living at Its Best
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-slate-100 mb-8 max-w-2xl mx-auto">
            Spacious 1-bedroom apartment steps from Gonzaga University and
            Sacred Heart Medical Center
          </p>

          {/* Price Badge */}
          <div className="inline-flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-lg px-6 py-4 mb-8 shadow-lg">
            <div className="text-3xl sm:text-4xl font-bold text-slate-900">
              $1,000<span className="text-lg font-normal">/mo</span>
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Furnished option available
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("contact-form")}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors w-full sm:w-auto min-w-[200px]"
            >
              Schedule a Tour
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg border-2 border-white/30 transition-all w-full sm:w-auto min-w-[200px]"
            >
              View Photos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

