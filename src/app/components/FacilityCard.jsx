"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function FacilityCard({ facility }) {
  const router = useRouter();
  const { user } = useAuth();
  const { _id, name, image, facility_type, price_per_hour, location } = facility;

  // Book Now বাটনে ক্লিক করলে এই ফাংশনটি চলবে
  const handleBookNow = () => {
    if (!user) {
      // ইউজার না থাকলে লগইন পেজে পাঠিয়ে দেবে
      router.push("/login");
    } else {
      // ইউজার থাকলে ডিটেইলস/বুকিং পেজে যাবে
      router.push(`/facilities/${_id}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
      <img 
        src={image || "https://placehold.co/600x400?text=No+Image"} 
        alt={name} 
        className="w-full h-48 object-cover" 
      />
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 truncate pr-2">{name}</h3>
          <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap">
            {facility_type}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 truncate">📍 {location}</p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <div className="text-gray-900 font-bold">
            <span className="text-blue-600 text-lg">৳{price_per_hour}</span>
            <span className="text-sm text-gray-500 font-normal"> /hr</span>
          </div>
          
          {/* Link এর বদলে button ব্যবহার করা হলো */}
          <button 
            onClick={handleBookNow}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}