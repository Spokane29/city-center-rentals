"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

const images: GalleryImage[] = [
  {
    src: "/images/property/Living.jpeg",
    alt: "Spacious living room with natural light",
  },
  {
    src: "/images/property/kitchen2.jpeg",
    alt: "Modern kitchen",
  },
  {
    src: "/images/property/bathroom.jpeg",
    alt: "Clean bathroom",
  },
  {
    src: "/images/property/outside-Spokane-6th-s.jpeg",
    alt: "6th Avenue street view in downtown Spokane",
  },
  {
    src: "/images/property/parking.jpeg",
    alt: "Parking area",
  },
];

export default function PhotoGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <>
      <section id="gallery" className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">
            Photo Gallery
          </h2>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {/* Large featured image */}
            <div
              className="sm:col-span-2 md:col-span-2 md:row-span-2 cursor-pointer group relative overflow-hidden rounded-lg touch-manipulation"
              onClick={() => openLightbox(0)}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="relative w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[500px]">
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Thumbnail grid */}
            {images.slice(1).map((image, index) => (
              <div
                key={index + 1}
                className="cursor-pointer group relative overflow-hidden rounded-lg touch-manipulation"
                onClick={() => openLightbox(index + 1)}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className="relative w-full h-full min-h-[200px] sm:min-h-[250px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-white hover:text-amber-500 transition-colors p-2 sm:p-3 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close lightbox"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous button - visible on mobile for swipe alternative */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-amber-500 transition-colors p-2 sm:p-3 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center bg-black/30 rounded-full sm:bg-transparent sm:rounded-none"
            aria-label="Previous image"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next button - visible on mobile for swipe alternative */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-amber-500 transition-colors p-2 sm:p-3 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center bg-black/30 rounded-full sm:bg-transparent sm:rounded-none"
            aria-label="Next image"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image container */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={1200}
              height={800}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

