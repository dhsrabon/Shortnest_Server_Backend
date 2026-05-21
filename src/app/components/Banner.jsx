"use client";

import Link from "next/link";
import { motion } from "framer-motion"; // 🟢 Framer Motion ইমপোর্ট করা হলো

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-[85vh] bg-white w-full overflow-hidden">
      
      {/* 🟢 Left Side: Content Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 lg:py-0 z-10">
        
        {/* ১. ছোট ট্যাগ/ব্যাজ (উপর থেকে লাফ দিয়ে নামবে) */}
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="mb-6 inline-flex items-center"
        >
          <span className="w-8 h-[2px] bg-blue-600 mr-3"></span>
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">
            SportNest Platform
          </span>
        </motion.div>

        {/* বিশাল ক্লিন টাইটেল */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
          
          {/* ২. Find Your (বাম দিক থেকে দৌড়ে আসবে) */}
          <motion.span 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
            className="block"
          >
            Find Your
          </motion.span>
          
          {/* ৩. Perfect Game (ডান দিক থেকে দৌড়ে আসবে) */}
          <motion.span 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.4 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500"
          >
            Perfect Game
          </motion.span>
        </h1>

        {/* সাব-টাইটেল (নিচ থেকে স্মুথলি ভেসে উঠবে) */}
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed"
        >
          Discover top-rated football turfs, badminton courts, and swimming pools near you. Skip the hassle of offline calls and secure your spot instantly.
        </motion.p>

        {/* বাটন গ্রুপ (একটু পরে ভেসে উঠবে) */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            href="/facilities" 
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-fit"
          >
            Explore Facilities
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </motion.div>

        {/* ছোট ইনফো */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex items-center gap-4 text-sm text-gray-500 font-medium"
        >
          <div className="flex -space-x-2">
            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="User" />
          </div>
          <p>Join 10,000+ players today</p>
        </motion.div>
      </div>

      {/* 🟢 Right Side: Image Area (ডান পাশ থেকে স্লাইড হয়ে আসবে) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full bg-gray-100"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1500&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent hidden lg:block"></div>
        </div>
        
        {/* ইমেজের ওপর ফ্লোটিং ব্যাজ (পপ করে উঠবে) */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 1.2 }}
          className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-white/50 hidden md:flex items-center gap-4 animate-bounce hover:animate-none cursor-default transition-all duration-300"
        >
          <div className="bg-green-100 p-3 rounded-full text-2xl">🏆</div>
          <div>
            <p className="text-gray-900 font-bold">Premium Turfs</p>
            <p className="text-gray-500 text-sm">Available Now</p>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
};

export default Banner;