import express from 'express';
import { 
    register, 
    login, 
    getMe, 
    googleLogin, 
    logout // <--- লগআউট ইমপোর্ট করা হলো
} from '../controllers/authController.js'; 

const router = express.Router();

// 🟢 নিচের এই রাউটগুলো না থাকার কারণেই 404 এরর আসছিল!
router.post('/register', register);
router.post('/login', login); 
router.post('/logout', logout);
router.get('/me', getMe);
router.post('/google', googleLogin); 

export default router;