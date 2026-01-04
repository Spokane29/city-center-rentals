export default function TrustBar() {
  return (
    <section className="bg-white border-b border-slate-200 py-4 sm:py-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-12 text-slate-700">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-amber-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium text-sm sm:text-base">No Application Fee</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-amber-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium text-sm sm:text-base">Flexible Move-in Dates</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-amber-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium text-sm sm:text-base">Professional Management</span>
          </div>
        </div>
      </div>
    </section>
  );
}

