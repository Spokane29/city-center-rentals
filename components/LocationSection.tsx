export default function LocationSection() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Unbeatable Location Section */}
        <div className="mb-10 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6 text-center">
            Unbeatable Location
          </h3>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
            Living at 29 E 6th Ave means you&apos;re perfectly positioned to enjoy everything Spokane offers.
            Walk to work, school, or entertainment without the hassle of driving and parking. Our residents
            love being just minutes from Riverfront Park, local coffee shops, restaurants, and shopping.
          </p>
        </div>

        {/* Centered larger map */}
        <div>
          <div className="w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-lg overflow-hidden shadow-lg">
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

        {/* Description below */}
        <div className="text-center mt-8">
          <p className="text-base sm:text-lg text-slate-700">
            Living at 29 E 6th Ave puts you in the heart of Spokane. Walk to
            class, work, or dinner without needing a car.
          </p>
        </div>
      </div>
    </section>
  );
}

