"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

// ব্র্যান্ড লোগো কম্পোনেন্ট
const BrandLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#4f46e5] shadow-lg">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 14.5C3.5 9.25329 8.25329 4.5 12 4.5C15.7467 4.5 20.5 9.25329 20.5 14.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 18.5H19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="14" r="3.5" fill="#34d399" />
        </svg>
      </div>
      <span className="text-2xl font-black tracking-tight text-[#0f172a]">
        Sport<span className="text-[#2563eb]">Nest</span>
      </span>
    </Link>
  );
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ড্রপডাউনের বাইরে ক্লিক করলে মেনু বন্ধ হওয়ার লজিক
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center">
            <BrandLogo />
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            
            {/* 🟢 আপডেট করা পাবলিক লিংকগুলো (বাটন ডিজাইন) */}
            <Link 
              href="/" 
              className="hidden md:block px-5 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-blue-600 hover:text-white hover:shadow-md transition-all duration-300"
            >
              Home
            </Link>
            <Link 
              href="/facilities" 
              className="px-5 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-blue-600 hover:text-white hover:shadow-md transition-all duration-300"
            >
              Facilities
            </Link>
            
            {user ? (
              // লগইন থাকলে প্রোফাইল বাটন ও ড্রপডাউন দেখাবে
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 hover:shadow-md transition-all"
                >
                  <img 
                    src={user?.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="Profile" 
                    className="w-7 h-7 rounded-full object-cover border-2 border-white/30"
                  />
                  <span className="text-sm font-bold tracking-wide pr-1">
                    {user?.name ? user.name.split(" ")[0] : "User"}
                  </span>
                </button>

                {/* ড্রপডাউন মেনু */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-down">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                    </div>
                    
                    <Link 
                      href="/my-bookings" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      My Bookings
                    </Link>
                    <Link 
                      href="/add-facility" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      Add Facility
                    </Link>
                    <Link 
                      href="/manage-facilities" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      Manage Facilities
                    </Link>
                    
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // লগইন না থাকলে Login বাটন দেখাবে
              <Link href="/login" className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-2.5 rounded-full hover:shadow-lg hover:shadow-blue-500/40 transition-all font-bold tracking-wide">
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}