import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand & Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-500">SportNest</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your ultimate platform to discover and book sports facilities effortlessly. Play your favorite sports without the hassle of offline booking.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link href="/facilities" className="hover:text-blue-400 transition">All Facilities</Link></li>
            <li><Link href="/login" className="hover:text-blue-400 transition">Login / Register</Link></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Contact Us</h3>
          <p className="text-gray-400 text-sm mb-2">Email: support@sportnest.com</p>
          <p className="text-gray-400 text-sm mb-4">Phone: +880 123 456 7890</p>
          
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"><FiFacebook className="text-xl" /></a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition"><FiTwitter className="text-xl" /></a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition"><FiInstagram className="text-xl" /></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-800 pt-4">
        &copy; {new Date().getFullYear()} SportNest. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;