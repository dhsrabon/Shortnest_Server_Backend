import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// রাউটগুলো ইমপোর্ট করা হলো
import facilityRoutes from './routes/facilityRoutes.js'; 
import bookingRoutes from './routes/bookingRoutes.js'; 
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'https://shortnest-frontend.vercel.app',
    process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_APP_URL,
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true // কুকি আদান-প্রদানের জন্য এটি অত্যাবশ্যক
}));
app.use(express.json());
app.use(cookieParser());

// Database Connection
connectDB();

// API Routes
app.use('/api/facilities', facilityRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes); // /me, /login, /register সব এখন এর ভেতরেই আছে!


// Test Route
app.get('/', (req, res) => {
    res.send('SportNest Server is Running!');
});

// সার্ভার স্টার্ট
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});