export default function LocationSection() {
  return (
    <section className="bg-slate-50 py-8 sm:py-12 lg:py-16 overflow-x-hidden">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 overflow-x-hidden">
        {/* Unbeatable Location Section */}
        <div className="mb-6 sm:mb-10 lg:mb-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 mb-3 sm:mb-4 lg:mb-6 text-center">
            Unbeatable Location
          </h3>
          <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed text-center max-w-3xl mx-auto px-2">
            Living at 29 E 6th Ave means you&apos;re perfectly positioned to enjoy everything Spokane offers.
            Walk to work, school, or entertainment without the hassle of driving and parking.
          </p>
        </div>

        {/* Map - Shorter on mobile */}
        <div>
          <div className="w-full h-[280px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21700!2d-117.41!3d47.655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549e185c30c67c7d%3A0x6a1d8c5f9c4b1234!2s29%20E%206th%20Ave%2C%20Spokane%2C%20WA%2099202!5e0!3m2!1sen!2sus!4v1704000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="City Center Apartments Location - 29 E 6th Ave, Spokane, WA 99202"
            ></iframe>
          </div>
        </div>

        {/* Get Directions button on mobile */}
        <div className="mt-4 sm:mt-6 text-center">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=29+E+6th+Ave,+Spokane,+WA+99202"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-semibold px-5 py-3 rounded-lg transition-colors text-sm sm:text-base min-h-[48px]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

