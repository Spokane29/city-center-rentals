export default function UnitDetails() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-slate-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
              Unit Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600">Apartment</span>
                <span className="font-semibold text-slate-900">#203</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600">Bedrooms</span>
                <span className="font-semibold text-slate-900">1</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600">Bathrooms</span>
                <span className="font-semibold text-slate-900">1</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600">Rent</span>
                <span className="font-semibold text-slate-900">$1,000/month</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600">Furnished</span>
                <span className="font-semibold text-slate-900">+$100/mo</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-600">Available</span>
                <span className="font-semibold text-amber-500">Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

