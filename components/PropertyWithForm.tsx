"use client";

import Image from "next/image";
import React, { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const [showMobileForm, setShowMobileForm] = useState(false);

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

      // Fire Facebook Pixel Lead event
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead");
      }

      // Show success modal
      setShowSuccessModal(true);

      // Redirect to home page after showing success message
      setTimeout(() => {
        window.location.href = '/';
      }, 2500);
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

  // Touch swipe support for mobile
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swiped left - next image
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else {
        // Swiped right - previous image
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
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

  return (
    <section className="bg-white pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 overflow-x-hidden">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 overflow-x-hidden">
        {/* Mobile: Title first, then form, then gallery */}
        {/* Desktop: Gallery left, form right */}
        
        {/* Mobile Title - Only shows on mobile */}
        <div className="lg:hidden mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
            Beautiful 1 Bedroom Apartment Available Now !
          </h1>
          <p className="text-slate-600 text-base mb-3">
            29 E 6th Ave, Spokane, WA 99202
          </p>
          {/* Key Details - Compact on mobile */}
          <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-slate-700">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">1 Bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">1 Bath</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-600 font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>$1,000/mo</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-start">
          {/* Left Column - Property Details (2/3 width) - Hidden title on mobile */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 order-2 lg:order-1">
            {/* Desktop Title - Hidden on mobile */}
            <div className="hidden lg:block mb-5">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                Beautiful 1 Bedroom Apartment Available Now !
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

            {/* Main Image with Swipe Support */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <div 
                className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-200 touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={`Property image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover select-none"
                  priority={currentImageIndex === 0}
                  draggable={false}
                />
                {/* Navigation Arrows - Larger touch targets on mobile */}
                <button
                  onClick={(e) => prevImage(e)}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white active:bg-white text-slate-900 p-2.5 sm:p-3 rounded-full shadow-xl transition-all z-10 hover:scale-110 active:scale-95 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Previous image"
                  type="button"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white active:bg-white text-slate-900 p-2.5 sm:p-3 rounded-full shadow-xl transition-all z-10 hover:scale-110 active:scale-95 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Next image"
                  type="button"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
                {/* Price Badge - Smaller on mobile */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-blue-900 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg">
                  <div className="text-base sm:text-xl font-bold">$1,000 Unfurnished</div>
                  <div className="text-xs sm:text-sm font-normal mt-0.5">Furnished add $100</div>
                </div>
                {/* Image Counter - Mobile indicator */}
                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/60 text-white px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Grid - Scrollable on mobile */}
            <div className="overflow-hidden -mx-3 sm:mx-0">
              <div className="flex gap-2 sm:grid sm:grid-cols-4 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 px-3 sm:px-0 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                  className={`relative flex-shrink-0 w-20 h-20 sm:w-auto sm:h-auto sm:aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer min-w-[80px] min-h-[80px] ${
                    currentImageIndex === index
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : "border-slate-300 active:border-blue-400"
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
            </div>

            {/* Description */}
            <div>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Experience the best of city living at 29 E 6th Avenue - perfectly positioned near downtown Spokane where work, study, and urban lifestyle converge.
              </p>
            </div>

            {/* Property Features - Collapsible on mobile */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Property Features</h2>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {propertyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0"
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
                    <span className="text-slate-700 text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center transform transition-all">
                <div className="mb-6">
                  <svg
                    className="w-16 h-16 text-green-500 mx-auto"
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
                  We&apos;ll contact you shortly to schedule a tour.
                </p>
                <p className="text-slate-600 text-sm">
                  Redirecting to home page...
                </p>
              </div>
            </div>
          )}

          {/* Mobile CTA Button - Only shows on mobile when form is collapsed */}
          <div className="lg:hidden order-1">
            {!showMobileForm ? (
              <button
                onClick={() => setShowMobileForm(true)}
                className="w-full bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all text-lg flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule a Tour
              </button>
            ) : (
              <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                {/* Form Header with Close Button */}
                <div className="bg-blue-900 text-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h2 className="text-lg font-bold">Request A Tour</h2>
                  </div>
                  <button
                    onClick={() => setShowMobileForm(false)}
                    className="text-white/80 hover:text-white p-1"
                    aria-label="Close form"
                    type="button"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Form Body */}
                <form onSubmit={handleSubmit} className="p-4 space-y-3">
                  {/* Name Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="mobile-firstName" className="block text-sm font-medium text-slate-700 mb-1.5">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="mobile-firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        autoComplete="given-name"
                        className={`w-full px-3 py-3 text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.firstName ? "border-red-500" : "border-slate-300"}`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="mobile-lastName" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="mobile-lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        autoComplete="family-name"
                        className={`w-full px-3 py-3 text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.lastName ? "border-red-500" : "border-slate-300"}`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="mobile-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="mobile-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      inputMode="email"
                      className={`w-full px-3 py-3 text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.email ? "border-red-500" : "border-slate-300"}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="mobile-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobile-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      className={`w-full px-3 py-3 text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.phone ? "border-red-500" : "border-slate-300"}`}
                      placeholder="(888) 613-0442"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  {/* Tour Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="mobile-tourDate" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Tour Date <span className="text-slate-400 text-xs">(Opt)</span>
                      </label>
                      <input
                        type="date"
                        id="mobile-tourDate"
                        name="tourDate"
                        value={formData.tourDate}
                        onChange={handleChange}
                        className="w-full px-2 py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobile-tourTime" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Time <span className="text-slate-400 text-xs">(Opt)</span>
                      </label>
                      <input
                        type="text"
                        id="mobile-tourTime"
                        name="tourTime"
                        value={formData.tourTime}
                        onChange={handleChange}
                        className="w-full px-2 py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="e.g., Mornings"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="mobile-notes" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Notes <span className="text-slate-400 text-xs">(Optional)</span>
                    </label>
                    <textarea
                      id="mobile-notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={2}
                      maxLength={500}
                      className="w-full px-3 py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                      placeholder="Questions?"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-900 hover:bg-blue-800 active:bg-blue-950 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors text-base min-h-[52px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Schedule Tour"
                    )}
                  </button>

                  {/* Call CTA */}
                  <div className="text-center pt-2 border-t border-slate-200">
                    <p className="text-slate-600 text-sm mb-1">Or call us directly</p>
                    <a href="tel:8886130442" className="inline-flex items-center justify-center gap-2 text-blue-600 font-semibold text-lg py-1 active:text-blue-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      (888) 613-0442
                    </a>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Desktop Contact Form - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1 order-2">
            <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden lg:sticky lg:top-20">
              {/* Form Header */}
              <div className="bg-blue-900 text-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h2 className="text-xl font-bold">Request A Tour</h2>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="desktop-firstName" className="block text-sm font-medium text-slate-700 mb-1.5">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="desktop-firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      autoComplete="given-name"
                      className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.firstName ? "border-red-500" : "border-slate-300"}`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="desktop-lastName" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="desktop-lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      autoComplete="family-name"
                      className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.lastName ? "border-red-500" : "border-slate-300"}`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="desktop-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="desktop-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.email ? "border-red-500" : "border-slate-300"}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="desktop-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="desktop-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.phone ? "border-red-500" : "border-slate-300"}`}
                    placeholder="(888) 613-0442"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                {/* Tour Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="desktop-tourDate" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Tour Date <span className="text-slate-400 text-xs">(Opt)</span>
                    </label>
                    <input
                      type="date"
                      id="desktop-tourDate"
                      name="tourDate"
                      value={formData.tourDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="desktop-tourTime" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Time <span className="text-slate-400 text-xs">(Opt)</span>
                    </label>
                    <input
                      type="text"
                      id="desktop-tourTime"
                      name="tourTime"
                      value={formData.tourTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="e.g., Mornings"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="desktop-notes" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Notes <span className="text-slate-400 text-xs">(Optional)</span>
                  </label>
                  <textarea
                    id="desktop-notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    placeholder="Questions or requirements?"
                  />
                </div>

                {/* Property Details Summary */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center justify-between text-sm text-slate-700">
                    <span>City Center Apartments</span>
                    <span className="font-semibold text-blue-600">$1,000/mo</span>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg min-h-[52px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Schedule Tour"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

