"use client";

import { useState } from "react";

export default function SeedPage() {
  const [status, setStatus] = useState("Click the button below to send all dummy data to MongoDB!");
  const [loading, setLoading] = useState(false);

  const seedData = async () => {
    setLoading(true);
    setStatus("Uploading data to MongoDB... Please wait.");
    
    // আপনার ৬টি ডামি ডাটার লিস্ট
    const fallbackFacilities = [
      { name: "KickOff Arena", facility_type: "Football", price_per_hour: 1500, location: "Dhanmondi, Dhaka", image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800&auto=format&fit=crop", description: "A top-quality football turf for competitive and casual matches.", capacity: "22 players", available_slots: "09:00 AM - 10:00 PM", owner_email: "admin@sportnest.com" },
      { name: "Smash Badminton Club", facility_type: "Badminton", price_per_hour: 500, location: "Mirpur, Dhaka", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop", description: "Enjoy fast-paced badminton games in our indoor courts.", capacity: "8 players", available_slots: "09:00 AM - 10:00 PM", owner_email: "admin@sportnest.com" },
      { name: "Aqua Blue Pool", facility_type: "Swimming", price_per_hour: 800, location: "Gulshan, Dhaka", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", description: "A serene swimming pool perfect for laps, training and aqua fitness.", capacity: "20 swimmers", available_slots: "09:00 AM - 10:00 PM", owner_email: "admin@sportnest.com" },
      { name: "Grand Slam Tennis", facility_type: "Tennis", price_per_hour: 1200, location: "Banani, Dhaka", image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop", description: "Premium tennis courts with professional-grade surfaces.", capacity: "4 players", available_slots: "09:00 AM - 10:00 PM", owner_email: "admin@sportnest.com" },
      { name: "Hoops Basketball", facility_type: "Basketball", price_per_hour: 1000, location: "Uttara, Dhaka", image: "https://images.unsplash.com/photo-1505666287802-931dc83948e9?q=80&w=800&auto=format&fit=crop", description: "A full-sized basketball court for 3-on-3 or 5-on-5 games.", capacity: "10 players", available_slots: "09:00 AM - 10:00 PM", owner_email: "admin@sportnest.com" },
      { name: "Striker Futsal", facility_type: "Football", price_per_hour: 1300, location: "Badda, Dhaka", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", description: "Indoor futsal court built for speed and skill.", capacity: "10 players", available_slots: "09:00 AM - 10:00 PM", owner_email: "admin@sportnest.com" },
    ];

    try {
      // লুপ চালিয়ে একটা একটা করে ডাটাবেসে পাঠানো হচ্ছে
      for (const item of fallbackFacilities) {
        await fetch("http://localhost:5000/api/facilities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
      setStatus("✅ Success! All 6 dummy facilities are now successfully saved to MongoDB.");
    } catch (error) {
      setStatus("❌ Error occurred while uploading data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Database Seeding 🚀</h1>
        <p className="text-gray-600 mb-8">{status}</p>
        
        <button 
          onClick={seedData} 
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-md disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload All Dummy Data"}
        </button>
      </div>
    </div>
  );
}