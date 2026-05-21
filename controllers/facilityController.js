import mongoose from 'mongoose';
import Facility from '../models/Facility.js';

export const resolveFacilityId = async (id) => {
    if (mongoose.isValidObjectId(id)) {
        return id;
    }

    if (/^\d+$/.test(id)) {
        const index = Number(id) - 1;
        const facility = await Facility.findOne().sort({ createdAt: 1 }).skip(index);
        return facility?._id || null;
    }

    return null;
};

// ১. নতুন ফ্যাসিলিটি তৈরি করা (Add Facility)
export const createFacility = async (req, res) => {
    try {
        const newFacility = new Facility(req.body);
        const savedFacility = await newFacility.save();
        res.status(201).json({ success: true, data: savedFacility, message: "Facility added successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// ২. সব ফ্যাসিলিটি একসাথে দেখা (Search & Filter সহ)
export const getAllFacilities = async (req, res) => {
    try {
        const { search, type } = req.query;
        let query = {};

        // Challenge: Implement search by facility name using $regex
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // 'i' মানে case-insensitive
        }

        // Challenge: Implement filter by sport type using $in
        if (type) {
            query.facility_type = { $in: [type] }; 
        }

        const facilities = await Facility.find(query);
        res.status(200).json({ success: true, data: facilities });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// ৩. নির্দিষ্ট একটি ফ্যাসিলিটি দেখা (Single Facility Details)
export const getFacilityById = async (req, res) => {
    try {
        const resolvedId = await resolveFacilityId(req.params.id);
        if (!resolvedId) {
            return res.status(404).json({ success: false, message: "Facility not found" });
        }

        const facility = await Facility.findById(resolvedId);
        if (!facility) {
            return res.status(404).json({ success: false, message: "Facility not found" });
        }
        res.status(200).json({ success: true, data: facility });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ success: false, message: "Invalid Facility ID format" });
        }
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
// ৪. ইউজারের নিজের তৈরি করা ফ্যাসিলিটিগুলো দেখা (Manage Facilities)
export const getFacilitiesByOwner = async (req, res) => {
    try {
        const facilities = await Facility.find({ owner_email: req.params.email });
        res.status(200).json({ success: true, data: facilities });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// ৫. ফ্যাসিলিটি ডিলিট করা
export const deleteFacility = async (req, res) => {
    try {
        const facility = await Facility.findByIdAndDelete(req.params.id);
        if (!facility) {
            return res.status(404).json({ success: false, message: "Facility not found" });
        }
        res.status(200).json({ success: true, message: "Facility deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
// facilityController.js এর ভেতরে যোগ করুন

export const updateFacility = async (req, res) => {
    try {
        const { id } = req.params; // ইউআরএল থেকে আইডি নেওয়া
        const updatedData = req.body; // ফ্রন্টএন্ড থেকে আসা নতুন ডাটা

        // ডাটাবেসে আইডি দিয়ে খুঁজে আপডেট করা
        const updatedFacility = await Facility.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedFacility) {
            return res.status(404).json({ success: false, message: "Facility not found" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Facility updated successfully", 
            facility: updatedFacility 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};