import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const requiredFields = ["facility_id", "facilityName", "user_email", "booking_date", "time_slot", "hours", "total_price"];

    for (const field of requiredFields) {
      if (!body?.[field]) {
        return NextResponse.json({ success: false, message: `Missing field: ${field}` }, { status: 400 });
      }
    }

    const db = await getMongoDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "MongoDB is not configured. Set MONGODB_URI in .env." }, { status: 500 });
    }

    const booking = {
      facility_id: body.facility_id,
      facility_name: body.facilityName,
      user_email: body.user_email,
      booking_date: body.booking_date,
      time_slot: body.time_slot,
      hours: body.hours,
      total_price: body.total_price,
      createdAt: new Date(),
    };

    const result = await db.collection("bookings").insertOne(booking);
    return NextResponse.json({ success: true, data: { id: result.insertedId.toString() } });
  } catch (error) {
    console.error("API /api/bookings error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
