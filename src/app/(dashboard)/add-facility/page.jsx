"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "../../context/AuthContext";

export default function AddFacilityPage() {
  const router = useRouter();
  const user = useRequireAuth();
  const [formData, setFormData] = useState({
    name: "",
    type: "Football",
    image: "",
    location: "",
    price: "",
    capacity: "",
    slots: "",
    description: "",
    ownerEmail: "" 
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // অটোমেটিকালি লগইন করা ইউজারের ইমেইল সেট করা
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, ownerEmail: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // নিরাপত্তা চেক
    if (!user?.email) {
      setMessage("❌ Please login first to add a facility.");
      setLoading(false);
      router.push("/login");
      return;
    }

    // ব্যাকএন্ডের ফরম্যাট অনুযায়ী ডাটা তৈরি
    const facilityData = {
      name: formData.name,
      facility_type: formData.type,
      image: formData.image,
      location: formData.location,
      price_per_hour: Number(formData.price),
      capacity: formData.capacity,
      available_slots: formData.slots,
      description: formData.description,
      owner_email: user.email,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/facilities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facilityData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("✅ Facility added successfully to SportNest!");
        // ফর্ম ক্লিয়ার করা (মালিকের ইমেইল বাদে)
        setFormData({
          ...formData, name: "", image: "", location: "", price: "", capacity: "", slots: "", description: ""
        });
      } else {
        setMessage(`❌ Failed to add facility: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding facility:", error);
      setMessage("❌ Server error occurred. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* 🟢 Main Container as a Premium Card */}
      <div className="max-w-5xl mx-auto bg-white p-10 sm:p-12 rounded-3xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 pb-8 border-b border-gray-100">
          <div className="bg-blue-100 bg-fuchsia-600 p-4 rounded-full mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Add New Facility</h1>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl">List your sports venue on SportNest and reach thousands of players instantly.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Grid for Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Facility Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Facility Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gray-50/50" placeholder="e.g. KickOff Arena Dhanmondi" />
            </div>

            {/* Facility Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Facility Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gray-50/50 cursor-pointer">
                <option value="Football">Football</option>
                <option value="Badminton">Badminton</option>
                <option value="Swimming">Swimming</option>
                <option value="Tennis">Tennis</option>
                <option value="Basketball">Basketball</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Cover Image URL</label>
              <input type="url" name="image" required value={formData.image} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gray-50/50" placeholder="https://example.com/image.jpg" />
              <p className="text-xs text-gray-500 mt-1.5">Paste a direct link to a high-quality image of your facility.</p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Location / Address</label>
              <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gray-50/50" placeholder="e.g. Road 16, Dhanmondi, Dhaka" />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Price Per Hour (৳)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">৳</span>
                <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full pl-10 pr-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gray-50/50" placeholder="e.g. 1500" />
              </div>
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Playing Capacity</label>
              <input type="text" name="capacity" required value={formData.capacity} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gray-50/50" placeholder="e.g. 10-14 Players (7v7)" />
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Operational Hours</label>
              <input type="text" name="slots" required value={formData.slots} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gray-50/50" placeholder="e.g. 07:00 AM - 12:00 AM" />
            </div>

            {/* Owner Email (ReadOnly) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Owner Contact Email</label>
              <input type="email" name="ownerEmail" readOnly value={formData.ownerEmail} className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed shadow-inner" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Facility Description</label>
            <textarea name="description" rows="5" required value={formData.description} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-gray-50/50" placeholder="Describe the ground quality, amenities (washroom, parking, water), and any specific rules..."></textarea>
          </div>

          {/* 🟡 Submit Button - Rounded & Premium Style */}
          <div className="pt-4">
              <button 
                  disabled={loading} 
                  type="submit" 
                  className="w-full inline-flex items-center justify-center gap-3 bg-to-r bg-emerald-800 -fuchsia-500 from-blue-600 to-indigo-700 text-white font-bold py-4 px-8 rounded-full hover:from-blue-700 hover:to-indigo-800 hover:shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none shadow-md"
              >
                  {loading ? (
                      <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                      </>
                  ) : (
                      "Add Facility to SportNest"
                  )}
              </button>
          </div>
        </form>

        {/* Message Area */}
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-4 rounded-xl text-center font-semibold text-sm shadow-inner ${message.includes("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {message}
          </motion.div>
        )}

      </div>
    </div>
  );
}