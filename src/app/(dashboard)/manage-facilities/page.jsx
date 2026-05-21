"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRequireAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "@/lib/apiUrl";

export default function ManageFacilitiesPage() {
  const user = useRequireAuth();
  const [myFacilities, setMyFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyFacilities = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/facilities/owner/${user.email}`);
        const result = await response.json();
        
        if (result.success) {
          setMyFacilities(result.data);
        }
      } catch (error) {
        console.error("Error fetching facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyFacilities();
  }, [user]);

  // ডিলিট হ্যান্ডলার (DELETE API)
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this facility? This action cannot be undone.")) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/facilities/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();

        if (result.success) {
          // ডিলিট সফল হলে UI থেকে সেটি রিমুভ করা
          const remainingFacilities = myFacilities.filter(facility => facility._id !== id);
          setMyFacilities(remainingFacilities);
        } else {
          alert("Failed to delete facility.");
        }
      } catch (error) {
        console.error("Error deleting facility:", error);
        alert("Server error occurred.");
      }
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
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage My Facilities</h1>
          
          {/* 🟢 Updated "+ Add New" Button */}
          <Link 
            href="/add-facility" 
            className="bg-cyan-950 text-white px-5 py-2.5 rounded-full hover:bg-cyan-900 transition-colors shadow-sm font-medium"
          >
            + Add New
          </Link>

        </div>

        {myFacilities.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-sm border-b">
                    <th className="py-4 px-6 font-semibold">Facility Name</th>
                    <th className="py-4 px-6 font-semibold">Type</th>
                    <th className="py-4 px-6 font-semibold">Location</th>
                    <th className="py-4 px-6 font-semibold">Price/Hour</th>
                    <th className="py-4 px-6 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myFacilities.map((facility) => (
                    <tr key={facility._id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-gray-900 font-medium">{facility.name}</td>
                      <td className="py-4 px-6 text-gray-600">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">{facility.facility_type}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{facility.location}</td>
                      <td className="py-4 px-6 text-gray-900 font-medium">৳{facility.price_per_hour}</td>
                      <td className="py-4 px-6 flex justify-center space-x-3">
                        <Link
                          href={`/manage-facilities/${facility._id}/edit`}
                          className="bg-green-50 text-green-600 hover:bg-green-600 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                        >
                          Update
                        </Link>
                        
                        <button 
                          onClick={() => handleDelete(facility._id)}
                          className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white p-10 rounded-lg shadow-sm text-center border border-gray-100">
            <h3 className="text-xl text-gray-700 font-medium mb-2">No facilities found</h3>
            <p className="text-gray-500 mb-6">You haven't added any sports facilities yet.</p>
            <Link 
              href="/add-facility" 
              className="bg-cyan-950 text-white px-6 py-2.5 rounded-full hover:bg-cyan-900 transition-colors shadow-sm font-medium"
            >
              Add Your First Facility
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}