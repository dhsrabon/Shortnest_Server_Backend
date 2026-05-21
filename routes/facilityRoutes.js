import express from 'express';
import { 
    createFacility, 
    getAllFacilities, 
    getFacilityById, 
    getFacilitiesByOwner, 
    deleteFacility,
    updateFacility // <--- আপডেটের ফাংশনটি এখানে ইমপোর্ট করা হলো
} from '../controllers/facilityController.js';

const router = express.Router();

// Routes: /api/facilities
router.post('/', createFacility); 
router.get('/', getAllFacilities); 
router.get('/owner/:email', getFacilitiesByOwner); // ইউজারের নিজের ডাটা দেখার রাউট
router.get('/:id', getFacilityById); 
router.put('/:id', updateFacility); // 🟢 ডাটা আপডেট করার রাউট (নতুন)
router.delete('/:id', deleteFacility); // ডাটা ডিলিট করার রাউট

export default router;