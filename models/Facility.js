import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    facility_type: { type: String, required: true },
    image: { type: String, required: true }, // ফ্রন্টএন্ডে দেখানোর জন্য ইমেজ ফিল্ড যোগ করা হয়েছে
    location: { type: String, required: true },
    price_per_hour: { type: Number, required: true },
    capacity: { type: String, required: true },
    available_slots: { type: String, required: true },
    description: { type: String, required: true },
    owner_email: { type: String, required: true },
    booking_count: { type: Number, default: 0 }
}, { 
    timestamps: true 
});

export default mongoose.model('Facility', facilitySchema);