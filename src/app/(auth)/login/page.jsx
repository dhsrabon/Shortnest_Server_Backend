"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useGoogleLogin } from '@react-oauth/google'; 
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const { login, register, googleLogin } = useAuth(); 
  
  // 🟢 Toggle State: Login or Register
  const [isLoginView, setIsLoginView] = useState(true);
  
  // States
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Handlers
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  // Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await login(loginData);
      if (result.success || result.user || result.token) {
        setMessage({ type: "success", text: "✅ Login successful! Redirecting..." });
        setTimeout(() => window.location.href = "/", 1000);
      } else {
        setMessage({ type: "error", text: `❌ ${result.message || "Invalid credentials"}` });
      }
    } catch (error) {
      setMessage({ type: "error", text: "❌ Server error occurred." });
    } finally {
      setLoading(false);
    }
  };

  // Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      return setMessage({ type: "error", text: "❌ Passwords do not match!" });
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await register({ 
        name: registerData.name, 
        email: registerData.email, 
        password: registerData.password,
        photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      });
      
      if (result.success) {
        setMessage({ type: "success", text: "✅ Registration successful! Please login." });
        setRegisterData({ name: "", email: "", password: "", confirmPassword: "" });
        setIsLoginView(true); // রেজিস্ট্রেশন হলে অটো লগইন ট্যাবে নিয়ে যাবে
      } else {
        setMessage({ type: "error", text: `❌ ${result.message || "Failed to register"}` });
      }
    } catch (error) {
      setMessage({ type: "error", text: "❌ Server error occurred." });
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', { 
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` } 
        });
        const backendResponse = await googleLogin({
          name: userInfo.data.name,
          email: userInfo.data.email,
          photo: userInfo.data.picture, 
        });

        if (backendResponse.success || backendResponse.user || backendResponse.token) {
          setMessage({ type: "success", text: "✅ Google Login successful!" });
          setTimeout(() => window.location.href = "/", 1000);
        } else {
          setMessage({ type: "error", text: `❌ ${backendResponse.message || "Failed to login"}` });
        }
      } catch (error) {
        setMessage({ type: "error", text: "❌ Failed to fetch Google profile." });
      } finally {
        setLoading(false);
      }
    },
    onError: () => setMessage({ type: "error", text: "❌ Google Login Failed." })
  });

  return (
    <div className="min-h-screen w-full flex bg-[#0f172a] font-sans">
      
      {/* =========================================
          🟢 LEFT SIDE: PICTURE AREA
      ========================================= */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        {/* আপনার পছন্দের ফুটবল/স্টেডিয়ামের ছবি */}
        <div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2000&auto=format&fit=crop')" }}
></div>
        
        {/* ডার্ক গ্রেডিয়েন্ট ওভারলে যাতে লেখা ফুটে ওঠে */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
        
        <div className="absolute bottom-16 left-16 z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-2xl font-black tracking-widest text-white uppercase">SportNest</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
            Book Your Turf.<br/>Play Like a Pro.
          </h1>
          <p className="text-gray-300 text-lg max-w-md">
            The ultimate platform to find and book premium sports facilities around you in just a few clicks.
          </p>
        </div>
      </div>

      {/* =========================================
          🟢 RIGHT SIDE: LOGIN / REGISTER AREA
      ========================================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        
        {/* গ্লোবাল মেসেজ অ্যালার্ট */}
        <AnimatePresence>
          {message.text && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className={`absolute top-8 left-1/2 -translate-x-1/2 w-max px-6 py-3 rounded-full text-sm font-bold shadow-lg z-50 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full max-w-[440px] bg-[#1e293b]/50 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-gray-700/50 shadow-2xl">
          
          {/* 🟢 Tabs (Toggle between Login & Register) */}
          <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-4">
            <button 
              onClick={() => { setIsLoginView(true); setMessage({ type: "", text: "" }); }}
              className={`text-xl font-bold transition-colors ${isLoginView ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Sign In
              {isLoginView && <motion.div layoutId="underline" className="h-1 bg-blue-500 mt-4 rounded-t-md"></motion.div>}
            </button>
            
            <button 
              onClick={() => { setIsLoginView(false); setMessage({ type: "", text: "" }); }}
              className={`text-xl font-bold transition-colors ${!isLoginView ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Register
              {!isLoginView && <motion.div layoutId="underline" className="h-1 bg-blue-500 mt-4 rounded-t-md"></motion.div>}
            </button>
          </div>

          <AnimatePresence mode="wait">
            
            {/* 🟦 LOGIN FORM */}
            {isLoginView ? (
              <motion.form 
                key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
                onSubmit={handleLoginSubmit} className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input type="email" name="email" required value={loginData.email} onChange={handleLoginChange} className="w-full px-5 py-3.5 bg-[#0f172a] border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-600 outline-none transition-all" placeholder="player@example.com" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-400">Password</label>
                    <a href="#" className="text-xs text-blue-500 hover:text-blue-400">Forgot?</a>
                  </div>
                  <input type="password" name="password" required value={loginData.password} onChange={handleLoginChange} className="w-full px-5 py-3.5 bg-[#0f172a] border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-600 outline-none transition-all" placeholder="••••••••" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] mt-2">
                  {loading ? "Signing in..." : "Login to Account"}
                </button>
              </motion.form>
            ) : 
            
            /* 🟥 REGISTER FORM */
            (
              <motion.form 
                key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                onSubmit={handleRegisterSubmit} className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                  <input type="text" name="name" required value={registerData.name} onChange={handleRegisterChange} className="w-full px-5 py-3 bg-[#0f172a] border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-600 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                  <input type="email" name="email" required value={registerData.email} onChange={handleRegisterChange} className="w-full px-5 py-3 bg-[#0f172a] border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-600 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                  <input type="password" name="password" required value={registerData.password} onChange={handleRegisterChange} className="w-full px-5 py-3 bg-[#0f172a] border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-600 outline-none transition-all" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Confirm Password</label>
                  <input type="password" name="confirmPassword" required value={registerData.confirmPassword} onChange={handleRegisterChange} className="w-full px-5 py-3 bg-[#0f172a] border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-600 outline-none transition-all" placeholder="••••••••" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-white hover:bg-gray-100 text-[#0f172a] font-bold py-3.5 rounded-xl transition-all shadow-lg mt-4">
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* 🟢 Social Login Area (Fixed at bottom) */}
          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <button
              type="button"
              onClick={() => handleGoogleSignIn()} 
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-[#0f172a] border border-gray-700 text-white font-medium py-3.5 rounded-xl hover:bg-gray-800 transition-all group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}