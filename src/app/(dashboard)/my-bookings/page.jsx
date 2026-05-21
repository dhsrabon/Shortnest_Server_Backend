"use client";

import { useState, useEffect } from "react";
import { useRequireAuth } from "../../context/AuthContext";

export default function MyBookingsPage() {
  const user = useRequireAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${user.email}`);
        const result = await response.json();

        if (result.success) {
          setBookings(result.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [user]);

  // বুকিং ক্যানসেল করার হ্যান্ডলার (DELETE API)
  const handleCancel = async (id) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();

        if (result.success) {
          // ক্যানসেল সফল হলে UI থেকে সেটি সরিয়ে দেওয়া
          const remainingBookings = bookings.filter(booking => booking._id !== id);
          setBookings(remainingBookings);
        } else {
          alert("Failed to cancel booking.");
        }
      } catch (error) {
        console.error("Error cancelling booking:", error);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {bookings.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-sm border-b">
                    <th className="py-4 px-6 font-semibold">Facility Name</th>
                    <th className="py-4 px-6 font-semibold">Date</th>
                    <th className="py-4 px-6 font-semibold">Time Slot</th>
                    <th className="py-4 px-6 font-semibold">Price</th>
                    <th className="py-4 px-6 font-semibold">Status</th>
                    <th className="py-4 px-6 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-gray-900 font-medium">{booking.facilityName}</td>
                      <td className="py-4 px-6 text-gray-600">{booking.booking_date}</td>
                      <td className="py-4 px-6 text-gray-600">{booking.time_slot}</td>
                      <td className="py-4 px-6 text-blue-600 font-bold">৳{booking.total_price}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          booking.status === "confirmed" ? "bg-green-100 text-green-800" : 
                          booking.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => handleCancel(booking._id)}
                          className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                          Cancel
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
            <h3 className="text-xl text-gray-700 font-medium mb-2">No bookings found</h3>
            <p className="text-gray-500">You haven't booked any sports facilities yet.</p>
          </div>
        )}

      </div>
    </div>
  );
}