import express from 'express';
import { createBooking, getUserBookings, cancelBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Routes: /api/bookings
router.post('/', createBooking); // বুকিং সেভ করার জন্য
router.get('/:email', getUserBookings); // ইউজারের বুকিং দেখার জন্য
router.delete('/:id', cancelBooking); // বুকিং ক্যানসেল করার জন্য

export default router;