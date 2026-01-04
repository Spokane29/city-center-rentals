"use client";

import Image from "next/image";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  tourDate: string;
  tourTime: string;
  notes: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  tourDate?: string;
  tourTime?: string;
}

const propertyFeatures = [
  "Near Sacred Heart & Deaconess",
  "Stove/Range",
  "Microwave",
  "Window Coverings",
  "Balcony",
  "Air Conditioning",
  "Garbage",
  "Laundry Room",
  "Pet Friendly",
  "Dishwasher",
  "Refrigerator",
  "Granite Counters",
  "Wood Floors",
  "Patio/Deck",
  "Cable TV Hookups",
  "Smoke Free",
  "Picnic Area",
  "Covered Parking",
];

export default function PropertyWithForm() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    tourDate: "",
    tourTime: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Interior images only - Living.jpeg is the main/first image
  const images = [
    "/images/Living.jpeg",
    "/images/bedroom.jpeg",
    "/images/kitchen2.jpeg",
    "/images/bathroom.jpeg",
  ];

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

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else {
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

    try {
      // Format phone for API (digits only)
      const phoneDigits = formData.phone.replace(/\D/g, "");

      // Submit to our API route (which handles LeasingVoice API)
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim() || "",
          email: formData.email.trim() || "",
          phone: phoneDigits,
          tourDate: formData.tourDate || "",
          tourTime: formData.tourTime.trim() || "",
          notes: formData.notes.trim() || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);

      // Fire Facebook Pixel event if available
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }

      // Redirect to home page after a brief delay to show success message
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please call us at (888) 613-0442.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  if (submitted) {
    return (
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center">
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
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Call (888) 613-0442
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Left Column - Property Details (2/3 width) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Property Title, Address, and Key Details - Level with Form */}
            <div className="mb-5">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                City Center Apartments
              </h1>
              <p className="text-slate-600 text-lg mb-4">
                29 E 6th Ave, Spokane, WA 99202
              </p>
              {/* Key Details with Icons */}
              <div className="flex flex-wrap gap-6 text-slate-700">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="font-medium">1 Bedroom</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">1 Bathroom</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">$1,000/month</span>
                </div>
              </div>
            </div>

            {/* Price Badge on Main Image */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-[4/3] bg-slate-200">
                <Image
                  src={images[currentImageIndex]}
                  alt={`Property image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority={currentImageIndex === 0}
                />
                {/* Navigation Arrows */}
                <button
                  onClick={(e) => prevImage(e)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-slate-900 p-3 rounded-full shadow-xl transition-all z-10 hover:scale-110 cursor-pointer"
                  aria-label="Previous image"
                  type="button"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => nextImage(e)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-slate-900 p-3 rounded-full shadow-xl transition-all z-10 hover:scale-110 cursor-pointer"
                  aria-label="Next image"
                  type="button"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                {/* Price Badge */}
                <div className="absolute top-4 left-4 bg-blue-900 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs">
                  <div className="text-xl font-bold">$1,000 Unfurnished</div>
                  <div className="text-sm font-normal mt-0.5">Furnished add $100</div>
                </div>
              </div>
            </div>

            {/* Thumbnail Grid - All images */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    currentImageIndex === index
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : "border-slate-300 hover:border-blue-400 hover:ring-1 hover:ring-blue-200"
                  }`}
                  type="button"
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {currentImageIndex === index && (
                    <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

            {/* Description */}
            <div>
              <p className="text-slate-700 leading-relaxed text-base">
                Experience the best of city living at 29 E 6th Avenue - perfectly positioned near downtown Spokane where work, study, and urban lifestyle converge.
              </p>
            </div>

            {/* Property Features */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Property Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {propertyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 flex-shrink-0"
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
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden sticky top-8">
              {/* Form Header */}
              <div className="bg-blue-900 text-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h2 className="text-xl font-bold">Contact Us</h2>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="property-firstName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="property-firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.firstName ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="property-lastName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="property-lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.lastName ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="property-email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="property-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.email ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="property-phone"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="property-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.phone ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="(888) 613-0442"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Tour Date */}
                <div>
                  <label
                    htmlFor="property-tourDate"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Preferred Tour Date <span className="text-slate-500 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    id="property-tourDate"
                    name="tourDate"
                    value={formData.tourDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.tourDate ? "border-red-500" : "border-slate-300"
                    }`}
                  />
                  {errors.tourDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.tourDate}</p>
                  )}
                </div>

                {/* Tour Time */}
                <div>
                  <label
                    htmlFor="property-tourTime"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Preferred Time <span className="text-slate-500 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="property-tourTime"
                    name="tourTime"
                    value={formData.tourTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.tourTime ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="e.g., Mornings, After 3pm, Anytime"
                  />
                  {errors.tourTime && (
                    <p className="mt-1 text-xs text-red-500">{errors.tourTime}</p>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label
                    htmlFor="property-notes"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Additional Notes <span className="text-slate-500 text-xs font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="property-notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    placeholder="Any specific questions or requirements?"
                  />
                  <p className="mt-1 text-xs text-slate-500 text-right">
                    {formData.notes.length}/500
                  </p>
                </div>

                {/* Property Details Summary */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Property Details:</h4>
                  <div className="space-y-1 text-sm text-slate-700">
                    <div>City Center Apartments</div>
                    <div>29 E 6th Ave, Spokane, WA 99202</div>
                    <div className="font-semibold text-blue-600">$1,000/month (Furnished +$100)</div>
                  </div>
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
                  className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Schedule Tour"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

