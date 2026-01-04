"use client";

import { useState, FormEvent, ChangeEvent } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  propertyInterest: string;
  moveInDate: string;
  scheduleViewing: boolean;
  message: string;
}

interface FormErrors {
  firstName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    propertyInterest: "",
    moveInDate: "",
    scheduleViewing: false,
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Phone number formatting function
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "");

    // Limit to 10 digits
    if (phoneNumber.length <= 10) {
      if (phoneNumber.length < 4) {
        return phoneNumber;
      } else if (phoneNumber.length < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      } else {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
      }
    }
    return value;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        phone: formatPhoneNumber(value),
      }));
    } else if (name === "message") {
      // Limit message to 500 characters
      if (value.length <= 500) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Phone validation
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Email validation (optional but validate format if provided)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Get UTM params from URL
    const params = new URLSearchParams(window.location.search);

    try {
      // Format phone for API (digits only)
      const phoneDigits = formData.phone.replace(/\D/g, "");

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim() || undefined,
            phone: phoneDigits,
            email: formData.email.trim() || undefined,
            propertyInterest:
              formData.propertyInterest || undefined,
            moveInDate: formData.moveInDate || undefined,
            scheduleViewing: formData.scheduleViewing || undefined,
            message: formData.message.trim() || undefined,
            utm_source: params.get("utm_source") || undefined,
            utm_medium: params.get("utm_medium") || undefined,
            utm_campaign: params.get("utm_campaign") || undefined,
            utm_content: params.get("utm_content") || undefined,
            referrer: document.referrer || undefined,
          }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);

      // Fire Facebook Pixel event (if available)
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
    } catch (err) {
      setError(
        "Something went wrong. Please call us at (888) 613-0442."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <section
        id="contact-form"
        className="bg-green-50 py-16 border-t border-green-100"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 text-green-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Thanks, {formData.firstName}!
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              We&apos;ll text you shortly to schedule a tour.
            </p>
            <p className="text-slate-600">
              Need us sooner?{" "}
              <a
                href="tel:8886130442"
                className="text-amber-500 hover:text-amber-600 font-semibold"
              >
                Call (888) 613-0442
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Form state
  return (
    <section
      id="contact-form"
      className="bg-white py-12 sm:py-16 border-t border-slate-200"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-3">
              Interested? Let&apos;s Talk.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Fill out the form below and we&apos;ll text you within minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
                  errors.firstName
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                placeholder="Doe"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
                  errors.phone ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="(509) 555-1234"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
                  errors.email ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Property Interest */}
            <div>
              <label
                htmlFor="propertyInterest"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Property Interest
              </label>
              <select
                id="propertyInterest"
                name="propertyInterest"
                value={formData.propertyInterest}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors bg-white"
              >
                <option value="">Select an option</option>
                <option value="1 Bedroom - $1,000/mo">
                  1 Bedroom - $1,000/mo
                </option>
                <option value="1 Bedroom Furnished - $1,100/mo">
                  1 Bedroom Furnished - $1,100/mo
                </option>
              </select>
            </div>

            {/* Move-in Date */}
            <div>
              <label
                htmlFor="moveInDate"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Move-in Date
              </label>
              <input
                type="date"
                id="moveInDate"
                name="moveInDate"
                value={formData.moveInDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
              />
            </div>

            {/* Schedule a Viewing */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="scheduleViewing"
                  name="scheduleViewing"
                  checked={formData.scheduleViewing}
                  onChange={handleChange}
                  className="w-5 h-5 text-amber-500 border-slate-300 rounded focus:ring-amber-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-slate-700">
                  I&apos;d like to schedule a viewing
                </span>
              </label>
            </div>

            {/* Questions */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Questions
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors resize-none"
                placeholder="Ask about parking, pets, utilities, or anything else..."
              />
              <p className="mt-1 text-sm text-slate-500 text-right">
                {formData.message.length}/500
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed text-slate-900 font-semibold py-3.5 sm:py-4 px-6 rounded-lg transition-colors touch-manipulation text-base sm:text-lg"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isSubmitting ? "Submitting..." : "Schedule a Tour"}
            </button>

            {/* Call us directly */}
            <p className="text-center text-slate-600 text-xs sm:text-sm">
              Or call us directly:{" "}
              <a
                href="tel:8886130442"
                className="text-amber-500 hover:text-amber-600 font-semibold"
              >
                (888) 613-0442
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

