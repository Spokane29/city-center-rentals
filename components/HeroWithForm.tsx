"use client";

import Image from "next/image";
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
}

export default function HeroWithForm() {
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
    const phoneNumber = value.replace(/\D/g, "");
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

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

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

    const params = new URLSearchParams(window.location.search);

    try {
      const phoneDigits = formData.phone.replace(/\D/g, "");

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim() || undefined,
          phone: phoneDigits,
          email: formData.email.trim() || undefined,
          propertyInterest: formData.propertyInterest || undefined,
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

      // Scroll to top of form on success
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
    } catch (err) {
      setError("Something went wrong. Please call us at (888) 613-0442.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="hero-form"
      className="relative min-h-screen flex items-center bg-slate-800"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/property/Living.jpeg"
          alt="City Center Apartments Living Room"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left Side - Headline and Text */}
          <div className="text-white space-y-4 sm:space-y-6 order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Downtown Spokane Living at Its Best
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-100 max-w-2xl leading-relaxed">
              Spacious 1-bedroom apartment steps from Gonzaga University and
              Sacred Heart Medical Center
            </p>
            <div className="flex items-center gap-4 pt-2 sm:pt-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                  $1,000<span className="text-base sm:text-lg font-normal">/mo</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">
                  Furnished option available
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Overlay */}
          <div className="w-full order-1 lg:order-2">
            {submitted ? (
              <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 text-center">
                <div className="mb-4 sm:mb-6">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4"
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
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Thanks, {formData.firstName}!
                </h2>
                <p className="text-base sm:text-lg text-slate-700 mb-4 sm:mb-6">
                  We&apos;ll text you shortly to schedule a tour.
                </p>
                <p className="text-sm sm:text-base text-slate-600">
                  Need us sooner?{" "}
                  <a
                    href="tel:8886130442"
                    className="text-amber-500 hover:text-amber-600 font-semibold"
                  >
                    Call (888) 613-0442
                  </a>
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                {/* Form Header */}
                <div className="bg-slate-800 text-white px-4 sm:px-6 py-3 sm:py-4">
                  <h2 className="text-lg sm:text-xl font-bold">REQUEST INFO</h2>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="hero-firstName"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="hero-firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
                        errors.firstName
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="hero-lastName"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="hero-lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="hero-email"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="hero-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
                        errors.email ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="hero-phone"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Phone # <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="hero-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors ${
                        errors.phone ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="(509) 555-1234"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Move-in Date */}
                  <div>
                    <label
                      htmlFor="hero-moveInDate"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Desired Move-In Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="hero-moveInDate"
                        name="moveInDate"
                        value={formData.moveInDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Property Interest */}
                  <div>
                    <label
                      htmlFor="hero-propertyInterest"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Select your desired floor plan...
                    </label>
                    <select
                      id="hero-propertyInterest"
                      name="propertyInterest"
                      value={formData.propertyInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors bg-white"
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

                  {/* I would like to... */}
                  <div>
                    <label
                      htmlFor="hero-action"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      I would like to...
                    </label>
                    <select
                      id="hero-action"
                      name="action"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "schedule-tour") {
                          setFormData((prev) => ({
                            ...prev,
                            scheduleViewing: true,
                          }));
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            scheduleViewing: false,
                          }));
                        }
                      }}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors bg-white"
                    >
                      <option value="schedule-tour">Schedule a Tour</option>
                      <option value="get-info">Get More Information</option>
                      <option value="virtual-tour">Schedule Virtual Tour</option>
                    </select>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed text-slate-900 font-bold py-3.5 sm:py-3 px-6 rounded-lg transition-colors uppercase tracking-wide text-sm sm:text-base touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

