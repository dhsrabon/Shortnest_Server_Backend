import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    facility_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Facility', 
        required: true 
    },
    facilityName: { type: String, required: true }, // ফ্রন্টএন্ডের ড্যাশবোর্ডে সহজে নাম দেখানোর জন্য
    user_email: { type: String, required: true },
    booking_date: { type: String, required: true },
    time_slot: { type: String, required: true },
    hours: { type: Number, required: true },
    total_price: { type: Number, required: true },
    status: { 
        type: String, 
        default: "pending", // অ্যাসাইনমেন্টের রিকোয়ারমেন্ট অনুযায়ী ডিফল্ট স্ট্যাটাস
        enum: ["pending", "confirmed", "cancelled"] 
    }
}, { 
    timestamps: true 
});

export default mongoose.model('Booking', bookingSchema);