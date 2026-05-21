"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/apiUrl";

export default function FeaturedFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/facilities`);
        const result = await response.json();
        
        if (result.success && result.data) {
          // হোম পেজে দেখানোর জন্য আমরা প্রথম ৬টি ডাটা (slice) নিচ্ছি
          setFacilities(result.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching featured facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#2563eb] mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading top facilities...</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-4 tracking-tight">
            Featured Facilities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check out some of our top-rated sports venues. Handpicked for the best experience.
          </p>
        </div>

        {facilities.length > 0 ? (
          <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {facilities.map((facility) => (
                <div 
                  key={facility._id} 
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="overflow-hidden relative h-60">
                    <img 
                      src={facility.image || "https://placehold.co/600x400?text=No+Image"} 
                      alt={facility.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#2563eb] text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wide shadow-sm">
                      {facility.facility_type}
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-[#0f172a] mb-2 group-hover:text-[#2563eb] transition-colors">
                      {facility.name}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mb-6 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span className="truncate">{facility.location}</span>
                    </p>
                    
                    {/* ✅ Fixed Price & Button Area */}
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                      
                      {/* Price */}
                      <p className="text-[#0f172a] font-extrabold text-xl sm:text-2xl">
                        ৳{facility.price_per_hour} <span className="text-sm font-medium text-gray-500">/ hr</span>
                      </p>

                      {/* Book Now Button (ডানপাশে ফিক্সড) */}
                      <Link 
                        href={`/facilities/${facility._id}`} 
                        className="bg-[#77498d] text-white text-sm font-bold py-2.5 px-6 rounded-full hover:opacity-90 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
                      >
                        Book Now
                      </Link>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Button */}
            <div className="text-center mt-16">
              <Link 
                href="/facilities" 
                className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-[#2563eb] bg-white border-2 border-[#2563eb] rounded-full hover:bg-[#2563eb] hover:text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                View All Facilities
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-200">
            <p className="text-xl">No facilities available right now. Please add some!</p>
          </div>
        )}

      </div>
    </section>
  );
}