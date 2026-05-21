import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";

const fallbackFacilities = [
  { id: "1", name: "KickOff Arena", facility_type: "Football Turf", price_per_hour: 1500, location: "Dhanmondi, Dhaka", image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800&auto=format&fit=crop", description: "A top-quality football turf for competitive and casual matches.", capacity: "22 players", available_slots: "5" },
  { id: "2", name: "Smash Badminton Club", facility_type: "Badminton", price_per_hour: 500, location: "Mirpur, Dhaka", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop", description: "Enjoy fast-paced badminton games in our indoor courts.", capacity: "8 players", available_slots: "3" },
  { id: "3", name: "Aqua Blue Pool", facility_type: "Swimming", price_per_hour: 800, location: "Gulshan, Dhaka", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", description: "A serene swimming pool perfect for laps, training and aqua fitness.", capacity: "20 swimmers", available_slots: "4" },
  { id: "4", name: "Grand Slam Tennis", facility_type: "Tennis Court", price_per_hour: 1200, location: "Banani, Dhaka", image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop", description: "Premium tennis courts with professional-grade surfaces.", capacity: "4 players", available_slots: "2" },
  { id: "5", name: "Hoops Basketball", facility_type: "Basketball Court", price_per_hour: 1000, location: "Uttara, Dhaka", image: "https://images.unsplash.com/photo-1505666287802-931dc83948e9?q=80&w=800&auto=format&fit=crop", description: "A full-sized basketball court for 3-on-3 or 5-on-5 games.", capacity: "10 players", available_slots: "4" },
  { id: "6", name: "Striker Futsal", facility_type: "Futsal", price_per_hour: 1300, location: "Badda, Dhaka", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", description: "Indoor futsal court built for speed and skill.", capacity: "10 players", available_slots: "3" },
];

export async function GET(request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim() || "";
  const type = url.searchParams.get("type")?.trim() || "";

  const query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  if (type) {
    query.facility_type = type;
  }

  try {
    const db = await getMongoDb();
    if (db) {
      const facilities = await db.collection("facilities").find(query).toArray();
      return NextResponse.json({ success: true, data: facilities });
    }

    const filtered = fallbackFacilities.filter((facility) => {
      const matchesSearch = !search || facility.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = !type || facility.facility_type === type;
      return matchesSearch && matchesType;
    });
    return NextResponse.json({ success: true, data: filtered });
  } catch (error) {
    console.error("API /api/facilities error:", error);
    return NextResponse.json({ success: false, message: error.message, data: [] }, { status: 500 });
  }
}
