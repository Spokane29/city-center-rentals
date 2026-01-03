export default function LocationSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          Location
        </h2>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left column - Google Maps */}
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.505429074123!2d-117.426046684369!3d47.658780979185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549e185c4b4b4b4b%3A0x4b4b4b4b4b4b4b4b!2s29%20E%206th%20Ave%2C%20Spokane%2C%20WA%2099202!5e0!3m2!1sen!2sus!4v1633072800000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="City Center Apartments Location - 29 E 6th Ave, Spokane, WA 99202"
            ></iframe>
          </div>

          {/* Right column - Location cards */}
          <div className="space-y-4">
            {/* Gonzaga University card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎓</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    12-min walk to Gonzaga University
                  </h3>
                  <p className="text-slate-600">
                    Perfect for students and faculty
                  </p>
                </div>
              </div>
            </div>

            {/* Sacred Heart Medical Center card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🏥</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    10-min walk to Sacred Heart Medical Center
                  </h3>
                  <p className="text-slate-600">
                    Ideal for healthcare professionals
                  </p>
                </div>
              </div>
            </div>

            {/* Downtown Spokane card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🌲</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Downtown Spokane
                  </h3>
                  <p className="text-slate-600">
                    Riverfront Park, restaurants, and shopping nearby
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description below */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-slate-700">
            Living at 29 E 6th Ave puts you in the heart of Spokane. Walk to
            class, work, or dinner without needing a car.
          </p>
        </div>
      </div>
    </section>
  );
}

