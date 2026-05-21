# ⚽ SportNest - Sports Facility Booking Platform

A modern, fully responsive sports facility booking platform where users can explore, book, and manage sports venues effortlessly. Built with a Monorepo structure using Next.js 16, React 19, Express.js, MongoDB, and secure JWT & Firebase Authentication.

## 🏟️ Facility Browsing

* Display of various sports facilities with detailed information.
* Facility filtering by category (Football, Cricket, Tennis, Indoor Sports, etc.).
* Premium facility cards showing name, price per hour, location, and availability status.
* Facility details page with full information, images, and booking options.
* Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop).

## 🏠 Home Page

* Eye-catching hero section with engaging sports visuals and call-to-actions.
* Featured facilities showcase (top-booked venues).
* "How it works" or Sports tips section with emojis.
* Top sporting brands/partners section.
* Fully animated sections using Framer Motion.

## 📱 Responsive Design

* Mobile-first approach ensuring a seamless experience across all devices.
* Optimized navigation for mobile screens, tablets, and large desktop monitors.

## 🎨 User Interface

* Premium Glassmorphism design aesthetic.
* Tailwind CSS for modern, consistent, and highly customizable styling.
* Smooth animations and page transitions with Framer Motion.
* Hover effects, interactive buttons, and professional card-based layouts.
* Clean and user-friendly dashboard UI.

## ⚙️ Technical Features

* Next.js App Router for seamless frontend routing.
* RESTful API backend built with Node.js & Express.js.
* MongoDB Atlas integration via Mongoose for persistent data storage.
* Secure environment variables for sensitive data (API keys, DB URIs, JWT Secrets).
* Error handling and user feedback via toast-like messages.
* Loading states and spinners for asynchronous operations.

## 🛠️ Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS, Framer Motion
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** Firebase Auth, JWT, Bcrypt.js

## 📦 NPM Packages

* `react-hook-form` (Form handling & validation)
* `framer-motion` (UI Animations)
* `axios` (Data fetching)
* `firebase` (Google OAuth)
* `jsonwebtoken` & `bcryptjs` (Backend Security)
* `cors` & `dotenv` (Server configuration)

## 🔐 Authentication Flow

### Registration
1. User fills out the registration form (Name, Email, Password, Photo URL).
2. Form validation checks email format and password strength via React Hook Form.
3. Backend securely hashes the password using Bcrypt.js.
4. User account is created and stored in the MongoDB database.
5. User is redirected to the login page.

### Login
1. User enters email and password.
2. Credentials are securely validated against the hashed password in the database.
3. A JWT (JSON Web Token) is generated and stored for session management.
4. User is redirected to the homepage or dashboard.
5. Navigation dynamically updates to show the user avatar and logout button.

### Google OAuth
1. User clicks "Continue with Google".
2. Handled via Firebase Authentication.
3. User grants permissions through the Google consent screen.
4. User data is synced with the backend MongoDB database.
5. User is seamlessly logged in and redirected to the home page.

### Protected Routes
* `/dashboard` - Requires authentication
* `/book-facility` - Requires authentication
* `/my-profile` - Requires authentication
* Unauthorized access automatically redirects the user to the login page.

## 🔒 Security Features

* **JWT Authorization:** API endpoints are protected using JSON Web Tokens.
* **Password Hashing:** Passwords are never stored in plain text; Bcrypt.js is used for secure hashing.
* **CORS Protection:** Cross-Origin Resource Sharing is configured to prevent unauthorized API requests.
* **Environment Secrets:** Sensitive credentials are kept out of the source code using `.env` files.

## 🚀 Deployment

This application is configured for modern cloud deployment. The project is structured as a Monorepo containing both the `client` and `server`.

### Vercel & Backend Specific Notes:
* **Frontend:** Deployed on Vercel. Ensure the `Root Directory` is set to the frontend folder (e.g., `sportsnest`).
* **Backend:** Deployed on Render / Vercel Serverless Functions.
* **Database:** Connected to a live MongoDB Atlas cluster ensuring persistent data storage (unlike ephemeral SQLite).
* Frontend Build Command: `npm run build` (inside client folder).
* Backend Start Command: `node index.js` (inside server folder).

## 💡 Challenges Implemented

* **Monorepo Git Resolution:** Successfully resolved Git Submodule conflicts caused by nested hidden `.git` folders to allow single-repo deployment.
* **My Profile:** A dedicated dashboard displaying user information (name, photo, email).
* **Update Information Feature:** Allows users to securely update their profile name and photo URL.
* **Framer Motion:** Implemented complex, smooth animations across the platform for a premium feel (replacing Animate.css).
