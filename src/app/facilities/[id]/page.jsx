"use client";

import { useState, useEffect } from "react";
// Next.js এর useParams হুকটি ইমপোর্ট করা হলো (এটি params এরর চিরতরে দূর করবে)
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function FacilityDetailsPage() {
  const router = useRouter();
  const params = useParams(); // params বের করার সবচেয়ে নিরাপদ উপায়
  const id = params?.id; // এখান থেকে id নেওয়া হলো

  // ডাটাবেস থেকে আসা ডাটার জন্য স্টেট
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallbackFacilities = [
    { id: "1", name: "KickOff Arena", facility_type: "Football Turf", price_per_hour: 1500, location: "Dhanmondi, Dhaka", image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800&auto=format&fit=crop", description: "A top-quality football turf for competitive and casual matches.", capacity: "22 players", available_slots: "5" },
    { id: "2", name: "Smash Badminton Club", facility_type: "Badminton", price_per_hour: 500, location: "Mirpur, Dhaka", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop", description: "Enjoy fast-paced badminton games in our indoor courts.", capacity: "8 players", available_slots: "3" },
    { id: "3", name: "Aqua Blue Pool", facility_type: "Swimming", price_per_hour: 800, location: "Gulshan, Dhaka", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", description: "A serene swimming pool perfect for laps, training and aqua fitness.", capacity: "20 swimmers", available_slots: "4" },
    { id: "4", name: "Grand Slam Tennis", facility_type: "Tennis Court", price_per_hour: 1200, location: "Banani, Dhaka", image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop", description: "Premium tennis courts with professional-grade surfaces.", capacity: "4 players", available_slots: "2" },
    { id: "5", name: "Hoops Basketball", facility_type: "Basketball Court", price_per_hour: 1000, location: "Uttara, Dhaka", image: "https://images.unsplash.com/photo-1505666287802-931dc83948e9?q=80&w=800&auto=format&fit=crop", description: "A full-sized basketball court for 3-on-3 or 5-on-5 games.", capacity: "10 players", available_slots: "4" },
    { id: "6", name: "Striker Futsal", facility_type: "Futsal", price_per_hour: 1300, location: "Badda, Dhaka", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", description: "Indoor futsal court built for speed and skill.", capacity: "10 players", available_slots: "3" },
  ];

  // বুকিং ফর্মের জন্য স্টেট
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [hours, setHours] = useState(1);
  const [message, setMessage] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  // ডাটাবেস থেকে সিঙ্গেল ফ্যাসিলিটি ফেচ করা
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchSingleFacility = async () => {
      try {
        // পরিবর্তন ১: 3000 এর বদলে 5000 দেওয়া হয়েছে
        const response = await fetch(`http://localhost:5000/api/facilities/${id}`);

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setFacility(result.data);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching facility details:", error);
      }

      const fallbackFacility = fallbackFacilities.find(
        (item) => String(item.id) === String(id) || String(item._id) === String(id)
      );
      if (fallbackFacility) {
        setFacility(fallbackFacility);
      }
      setLoading(false);
    };

    fetchSingleFacility();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Facility Not Found</h2>
        <p className="text-gray-500">The facility you are looking for does not exist.</p>
      </div>
    );
  }

  const totalPrice = facility.price_per_hour * hours;

  // বুকিং ফর্ম সাবমিট হ্যান্ডলার (API Call)
  const { user } = useAuth();

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsBooking(true);
    setMessage("");

    if (!user) {
      setMessage("❌ Please login first to book a facility.");
      setIsBooking(false);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    // ডাটাবেস মডেল অনুযায়ী বুকিং ডাটা সাজানো
    const bookingData = {
      facility_id: facility._id || facility.id, // ফলব্যাক আইডিও যেন কাজ করে
      facilityName: facility.name,
      user_email: user.email,
      booking_date: date,
      time_slot: timeSlot,
      hours: hours,
      total_price: totalPrice
    };

    try {
      // পরিবর্তন ২: /api/bookings এর বদলে সম্পূর্ণ ব্যাকএন্ড লিংক দেওয়া হয়েছে
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("✅ Booking confirmed successfully!");
        setDate("");
        setTimeSlot("");
        setHours(1);
      } else {
        setMessage("❌ Failed to book facility.");
      }
    } catch (error) {
      console.error("Error making booking:", error);
      setMessage("❌ Server error occurred.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Facility Details */}
          <div className="md:w-3/5">
            <img 
              src={facility.image} 
              alt={facility.name} 
              className="w-full h-72 md:h-96 object-cover" 
            />
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{facility.name}</h1>
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                  {facility.facility_type}
                </span>
              </div>
              
              <div className="space-y-3 text-gray-600 mb-6">
                <p className="flex items-center">
                  <span className="font-semibold w-24 text-gray-800">Location:</span> {facility.location}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold w-24 text-gray-800">Capacity:</span> {facility.capacity}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold w-24 text-gray-800">Slots:</span> {facility.available_slots}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold w-24 text-gray-800">Price:</span> 
                  <span className="text-blue-600 font-bold text-xl">৳{facility.price_per_hour} / hour</span>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {facility.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <div className="md:w-2/5 bg-blue-50 p-8 border-l border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book This Facility</h2>
            
            <form onSubmit={handleBooking} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                <select required value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 bg-white">
                  <option value="">Choose a time slot</option>
                  <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                  <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                  <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                  <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                  <option value="08:00 PM - 09:00 PM">08:00 PM - 09:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Hours)</label>
                <input type="number" min="1" max="5" required value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500" />
              </div>

              <div className="bg-white p-4 rounded-md border border-blue-100 flex justify-between items-center mt-6">
                <span className="font-semibold text-gray-700">Total Price:</span>
                <span className="text-2xl font-bold text-blue-600">৳{totalPrice}</span>
              </div>

              <button 
                type="submit" 
                disabled={isBooking}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors shadow-sm mt-4 disabled:bg-blue-400"
              >
                {isBooking ? "Confirming Booking..." : "Confirm Booking"}
              </button>
            </form>

            {message && (
              <div className={`mt-4 p-3 rounded-md text-sm text-center font-medium ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {message}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}