import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google'; // 🟢 এটি ইমপোর্ট করুন
import "./globals.css";

export const metadata = {
  title: "SportNest | Book Sports Facilities",
  description: "Explore and book sports facilities effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <AuthProvider>
          {/* 🟢 এখানে আপনার ক্লায়েন্ট আইডিটি বসাতে হবে */}
          <GoogleOAuthProvider clientId="893430209928-a5g8umoq1hnc4euk2elfsf8qeg9dbsoa.apps.googleusercontent.com">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </GoogleOAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}