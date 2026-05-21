import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ১. ইউজার রেজিস্ট্রেশন (Register)
export const register = async (req, res) => {
    try {
        const { name, email, photo, password } = req.body;
        
        // চেক করা ইউজার আগে থেকেই আছে কি না
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (!existingUser.password) {
                // Google দিয়ে আগে তৈরি করা ইউজারকে এখন পাসওয়ার্ড সেট করে নেবে
                const salt = await bcrypt.genSalt(10);
                existingUser.password = await bcrypt.hash(password, salt);
                existingUser.name = name || existingUser.name;
                existingUser.photo = photo || existingUser.photo;
                await existingUser.save();
                return res.status(200).json({ success: true, message: "Password added to your Google account. You can now login with email and password." });
            }
            return res.status(400).json({ success: false, message: "User already exists with this email." });
        }

        // পাসওয়ার্ড হ্যাশ করা (সিকিউরিটির জন্য)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // নতুন ইউজার সেভ করা
        const newUser = new User({ name, email, photo, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// ২. ইউজার লগইন (Login)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ইউজার ডাটাবেসে আছে কি না চেক করা
        const user = await User.findOne({ email });
        
        // ১. যদি ইমেইলটি ডাটাবেসে না থাকে
        if (!user) {
            return res.status(401).json({ success: false, message: "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট নেই! দয়া করে আগে Register করুন।" });
        }

        // ২. যদি ইউজার গুগল দিয়ে অ্যাকাউন্ট খুলে থাকে (গুগলে পাসওয়ার্ড থাকে না)
        if (!user.password) {
            return res.status(401).json({ success: false, message: "আপনি গুগল দিয়ে অ্যাকাউন্ট খুলেছিলেন। দয়া করে লাল রঙের 'Continue with Google' বাটনে ক্লিক করুন।" });
        }

        // ৩. পাসওয়ার্ড ঠিক আছে কি না চেক করা
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "আপনার পাসওয়ার্ডটি ভুল হয়েছে! আবার চেষ্টা করুন।" });
        }

        // JWT টোকেন তৈরি করা (লগইন সেশন ধরে রাখার জন্য)
        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        // টোকেনটি কুকিতে সেট করে পাঠানো
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // ৭ দিনের জন্য
        }).status(200).json({ 
            success: true, 
            message: "Logged in successfully!",
            user: { _id: user._id, name: user.name, email: user.email, photo: user.photo }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// ৩. কারেন্ট ইউজার চেক করা (পেজ রিলোড দিলে এটি কল হবে)
export const getMe = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(200).json({ success: false, message: "No token found" });
        }

        // টোকেন ভেরিফাই করা
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ডাটাবেস থেকে আসল ইউজারকে খুঁজে বের করা (পাসওয়ার্ড ছাড়া)
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(200).json({ success: false, message: "User not found" });
        }

        // আসল ইউজারের ডাটা ফ্রন্টএন্ডে পাঠানো
        res.status(200).json({ success: true, user });

    } catch (error) {
        res.status(200).json({ success: false, message: "Invalid or expired token" });
    }
};

// ৪. গুগল লগইন (Google Login)
export const googleLogin = async (req, res) => {
    try {
        const { name, email, photo } = req.body;

        // ১. চেক করা ইউজার ডাটাবেসে আছে কি না
        let user = await User.findOne({ email });

        // ২. একই ইমেইল থাকলে আগের ইউজারকে ব্যবহার করে লগইন করব
        if (user) {
            // ইউজার নাম বা ছবি গুগল থেকে আপডেট করলে সেই তথ্যও আপডেট করা হবে
            let needsSave = false;
            if (name && user.name !== name) {
                user.name = name;
                needsSave = true;
            }
            if (photo && user.photo !== photo) {
                user.photo = photo;
                needsSave = true;
            }
            if (needsSave) await user.save();
        } else {
            user = new User({ 
                name, 
                email, 
                photo
            });
            await user.save();
        }

        // ৩. JWT টোকেন তৈরি করা
        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        // ৪. কুকিতে টোকেন সেট করে রেসপন্স পাঠানো
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).status(200).json({ 
            success: true, 
            message: "Google login successful!",
            user: { _id: user._id, name: user.name, email: user.email, photo: user.photo }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Google login failed", error: error.message });
    }
};

// ৫. লগআউট (Logout)
export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
        }).status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Logout failed" });
    }
};