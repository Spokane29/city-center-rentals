"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What&apos;s included in the rent?",
    answer:
      "Rent covers the apartment only. Tenant is responsible for electricity and internet. Water, sewer, and garbage are included.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes, there is parking on-site. Ask us about current availability and any associated costs.",
  },
  {
    question: "Are pets allowed?",
    answer:
      "Pet policy varies. Contact us to discuss your specific situation.",
  },
  {
    question: "What&apos;s the application process?",
    answer:
      "Contact us to schedule a tour first. If you like what you see, we&apos;ll walk you through the simple application process.",
  },
  {
    question: "Is the furnished option worth it?",
    answer:
      "For $100/month extra, you get a fully furnished apartment - great for students or anyone wanting a move-in ready home without the hassle of buying furniture.",
  },
  {
    question: "How long is the lease?",
    answer:
      "We prefer 12-month leases, but contact us to discuss your needs.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Common Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-slate-900 pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-slate-600 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-4 text-slate-700 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

