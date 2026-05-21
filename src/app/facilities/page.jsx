"use client";

import { useState, useEffect } from "react";
import FacilityCard from "../components/FacilityCard";
import { FiSearch, FiFilter } from "react-icons/fi";
import { API_BASE_URL } from "@/lib/apiUrl";

export default function AllFacilitiesPage() {
  // ডাটাবেস থেকে পাওয়া ডাটা রাখার স্টেট
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে ডাটা ফেচ করার ফাংশন
  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        // ✅ ঠিক করা হয়েছে: সরাসরি ৫০০০ পোর্টে (ব্যাকএন্ডে) রিকোয়েস্ট পাঠানো হচ্ছে
        const response = await fetch(`${API_BASE_URL}/api/facilities?search=${encodeURIComponent(searchTerm)}&type=${encodeURIComponent(filterType)}`, {
          cache: "no-store",
        });
        const result = await response.json();
        
        if (result.success) {
          setFacilities(result.data);
        }
      } catch (error) {
        console.error("Error fetching facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    // ইউজার টাইপ করার সময় সাথে সাথে যাতে বারবার রিকোয়েস্ট না যায়, তাই 500ms এর একটু ডিবাইন্স (Delay) দেওয়া হলো
    const delayDebounceFn = setTimeout(() => {
      fetchFacilities();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filterType]); // সার্চ বা ফিল্টার চেঞ্জ হলেই API কল হবে

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore All Facilities</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect spot for your next game. Search by name or filter by your favorite sport.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-100">
          
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search facility by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full md:w-1/4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white"
            >
              <option value="">All Sports</option>
              <option value="Football">Football</option>
              <option value="Badminton">Badminton</option>
              <option value="Swimming">Swimming</option>
              <option value="Tennis">Tennis</option>
              <option value="Basketball">Basketball</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading facilities...</p>
          </div>
        ) : (
          /* Facilities Grid */
          facilities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility) => (
                <FacilityCard key={facility._id} facility={facility} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No facilities found</h3>
              <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )
        )}

      </div>
    </div>
  );
}