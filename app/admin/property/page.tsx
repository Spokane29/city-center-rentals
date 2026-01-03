"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";

interface Property {
  id: string;
  name: string;
  unit_number: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  rent_unfurnished: number;
  rent_furnished: number;
  available: boolean;
  available_date: string | null;
  description: string;
  features: string[];
  images: string[];
}

export default function PropertyPage() {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await fetch("/api/admin/property");
      const data = await res.json();
      setProperty(data);
    } catch (err) {
      console.error("Failed to fetch property:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!property) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/property", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });

      if (!res.ok) throw new Error("Failed to save");

      alert("Property updated successfully!");
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Failed to save property");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !property) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setProperty({
          ...property,
          images: [...property.images, data.url],
        });
      }
    } catch (err) {
      console.error("Failed to upload:", err);
      alert("Failed to upload image");
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!property) return;
    setProperty({
      ...property,
      images: property.images.filter((_, i) => i !== index),
    });
  };

  const handleAddFeature = () => {
    if (!property || !newFeature.trim()) return;
    setProperty({
      ...property,
      features: [...property.features, newFeature.trim()],
    });
    setNewFeature("");
  };

  const handleRemoveFeature = (index: number) => {
    if (!property) return;
    setProperty({
      ...property,
      features: property.features.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center text-slate-600">Loading...</div>
      </AdminLayout>
    );
  }

  if (!property) {
    return (
      <AdminLayout>
        <div className="text-center text-slate-600">Property not found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Property</h1>
          <div className="flex gap-3">
            <a
              href="/"
              target="_blank"
              className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View Live Site
            </a>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed text-slate-900 font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-slate-200 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Property Name
              </label>
              <input
                type="text"
                value={property.name}
                onChange={(e) => setProperty({ ...property, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Unit Number
              </label>
              <input
                type="text"
                value={property.unit_number || ""}
                onChange={(e) =>
                  setProperty({ ...property, unit_number: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={property.address}
                onChange={(e) => setProperty({ ...property, address: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={property.city}
                onChange={(e) => setProperty({ ...property, city: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                State
              </label>
              <input
                type="text"
                value={property.state}
                onChange={(e) => setProperty({ ...property, state: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Zip
              </label>
              <input
                type="text"
                value={property.zip}
                onChange={(e) => setProperty({ ...property, zip: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                value={property.bedrooms}
                onChange={(e) =>
                  setProperty({ ...property, bedrooms: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                value={property.bathrooms}
                onChange={(e) =>
                  setProperty({ ...property, bathrooms: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Rent Unfurnished ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={property.rent_unfurnished || ""}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    rent_unfurnished: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Rent Furnished ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={property.rent_furnished || ""}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    rent_furnished: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={property.available}
                onChange={(e) =>
                  setProperty({ ...property, available: e.target.checked })
                }
                className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
              />
              <span className="text-sm font-medium text-slate-700">Available</span>
            </label>

            {!property.available && (
              <div className="flex-1 max-w-xs">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Available Date
                </label>
                <input
                  type="date"
                  value={property.available_date || ""}
                  onChange={(e) =>
                    setProperty({ ...property, available_date: e.target.value || null })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={property.description || ""}
              onChange={(e) =>
                setProperty({ ...property, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Features
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddFeature()}
                placeholder="Add a feature..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
              <button
                onClick={handleAddFeature}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm"
                >
                  {feature}
                  <button
                    onClick={() => handleRemoveFeature(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Images
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {property.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                      Hero
                    </div>
                  )}
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-slate-900 hover:file:bg-amber-600"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

