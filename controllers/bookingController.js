import Booking from '../models/Booking.js';
import { resolveFacilityId } from './facilityController.js';

// ১. নতুন বুকিং তৈরি করা (Create Booking)
export const createBooking = async (req, res) => {
    try {
        const {
            facility_id,
            facilityName,
            user_email,
            booking_date,
            time_slot,
            hours,
            total_price
        } = req.body;

        if (!facility_id || !facilityName || !user_email || !booking_date || !time_slot || !hours || !total_price) {
            return res.status(400).json({ success: false, message: "Missing required booking fields" });
        }

        const resolvedFacilityId = await resolveFacilityId(facility_id);
        if (!resolvedFacilityId) {
            return res.status(400).json({ success: false, message: "Invalid facility identifier" });
        }

        const newBooking = new Booking({
            ...req.body,
            facility_id: resolvedFacilityId
        });

        const savedBooking = await newBooking.save();
        res.status(201).json({ success: true, data: savedBooking, message: "Booking confirmed successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// ২. নির্দিষ্ট ইউজারের সব বুকিং দেখা (My Bookings পেজের জন্য)
export const getUserBookings = async (req, res) => {
    try {
        const { email } = req.params;
        const bookings = await Booking.find({ user_email: email });
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// ৩. বুকিং ক্যানসেল করা (Cancel Booking)
export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Booking cancelled successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};