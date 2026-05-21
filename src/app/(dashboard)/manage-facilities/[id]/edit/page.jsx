"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRequireAuth } from "../../../../context/AuthContext";
import { API_BASE_URL } from "@/lib/apiUrl";

export default function EditFacilityPage() {
  const router = useRouter();
  const params = useParams();
  const user = useRequireAuth();
  const facilityId = params?.id;

  const [formData, setFormData] = useState({
    name: "",
    type: "Football",
    image: "",
    location: "",
    price: "",
    capacity: "",
    slots: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!facilityId) return;

    const fetchFacility = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/facilities/${facilityId}`);
        const result = await response.json();
        if (result.success && result.data) {
          const facility = result.data;
          setFormData({
            name: facility.name || "",
            type: facility.facility_type || "Football",
            image: facility.image || "",
            location: facility.location || "",
            price: facility.price_per_hour ? String(facility.price_per_hour) : "",
            capacity: facility.capacity || "",
            slots: facility.available_slots || "",
            description: facility.description || "",
          });
        } else {
          setMessage("❌ Facility not found.");
        }
      } catch (error) {
        console.error("Error loading facility:", error);
        setMessage("❌ Unable to load facility data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [facilityId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    if (!user?.email) {
      setMessage("❌ Please login first to update this facility.");
      router.push("/login");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/facilities/${facilityId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          facility_type: formData.type,
          image: formData.image,
          location: formData.location,
          price_per_hour: Number(formData.price),
          capacity: formData.capacity,
          available_slots: formData.slots,
          description: formData.description,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("✅ Facility updated successfully.");
        router.push("/manage-facilities");
      } else {
        setMessage("❌ Failed to update facility. Please try again.");
      }
    } catch (error) {
      console.error("Error updating facility:", error);
      setMessage("❌ Server error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Facility</h1>
          <p className="text-gray-600 mt-2">Update your facility details and save changes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facility Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="e.g. KickOff Arena"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facility Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 bg-white"
              >
                <option value="Football">Football</option>
                <option value="Badminton">Badminton</option>
                <option value="Swimming">Swimming</option>
                <option value="Tennis">Tennis</option>
                <option value="Basketball">Basketball</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="e.g. Dhanmondi, Dhaka"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Hour (৳)</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="e.g. 1500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input
                type="text"
                name="capacity"
                required
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="e.g. 10-14 Players"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Time Slots</label>
              <input
                type="text"
                name="slots"
                required
                value={formData.slots}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="e.g. 09:00 AM - 10:00 PM"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
              placeholder="Write a short description..."
            />
          </div>

          <button
            disabled={submitting}
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {submitting ? "Updating Facility..." : "Update Facility"}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-md text-center font-medium ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
