# 🏎️ VelocityDrive — Premium Rental Car Booking Website

**VelocityDrive** is a modern, responsive, high-performance Rental Car Booking web application built with **React.js 19**, **Vite**, **Tailwind CSS v4**, and **React Router DOM v7**.

Designed for seamless car search, date-based price calculations, real-time filtering, detailed vehicle inspection, and full reservation checkout with printable booking vouchers.

---

## ✨ Features & Pages Overview

### 1. 🏠 Home Page (`/`)
- **Luxury Navbar**: Glassmorphism sticky navbar with brand logo, quick navigation links, active bookings counter badge, 24/7 hotline, and mobile drawer menu.
- **Hero Section**: High-resolution atmospheric backdrop with tagline, trust badges, and an embedded **Booking Search Form**.
- **Interactive Booking Search Form**:
  - Pickup and Drop-off locations (airports, downtown hubs, hotel delivery).
  - "Return to same location" toggle and location swap shortcut.
  - Pickup date/time and Return date/time with live duration calculator.
  - Quick car category filter pills (Sports, SUV, Luxury, Electric, All).
- **Featured & Popular Showcase**: Filter toggle between *Featured* track legends and *Most Popular* cruisers.
- **Why Choose VelocityDrive**: Value propositions including dealer-maintained fleet, doorstep delivery, zero hidden fees, and 24/7 roadside VIP support.
- **How Renting Works**: 3-step visual guide from selecting a vehicle to ignition.
- **Verified Testimonials**: Real driver reviews with ratings and vehicle tags.
- **Interactive FAQ Accordion**: Expandable answers for deposits, license requirements, and insurance policies.
- **Footer**: Fleet categories, operating airport hubs, interactive VIP newsletter signup, and legal links.

### 2. 🚗 Cars Listing Page (`/cars`)
- **Fleet Grid**: Displays cars with high-res photos, availability status pills (`Available Now`, `Fast Booking`, `Reserved`), ratings, categories, transmission, seats, fuel type, and daily prices.
- **Multi-parameter Filter Sidebar**:
  - Keyword search input (brand, model, spec).
  - Body & vehicle type selector.
  - Automaker brand filter (Porsche, Tesla, Mercedes-Benz, BMW, Audi, Land Rover, Chevrolet, Ford, Hyundai).
  - Transmission filter (Automatic / Manual).
  - Powertrain filter (Petrol, Electric, Hybrid).
  - Price slider with dynamic upper bound ($150 to $600/day).
  - "Available Immediately Only" quick toggle.
  - One-click **Reset All Filters** button.
- **Sorting**: Featured First, Price: Low to High, Price: High to Low, Highest Rated, and Alphabetical (A-Z).
- **Mobile Filter Drawer**: Slide-out modal filter with active count badge on smaller screens.

### 3. 🔍 Car Details Page (`/cars/:id`)
- **Interactive Multi-Angle Gallery**: Large main view with clickable high-res thumbnail reel.
- **Performance Specs Grid**: 0-60 mph acceleration, horsepower, top speed, transmission, powertrain, fuel capacity / battery size, seating, and luggage volume.
- **Included Tech & Luxury Features**: Apple CarPlay, premium surround sound, 360 cameras, massage seats, etc.
- **Multi-Tier Pricing Card**: Daily, Weekly (15% discount), and Monthly (30% discount) rates.
- **Instant Rental Date Estimator**: Select pickup & drop-off dates directly on the details page to dynamically calculate estimated total rental cost.
- **Direct Book Now CTA**: Passes selected dates into the checkout page.
- **Similar Vehicle Suggestions**: Recommends alternative models within the same category.

### 4. 📝 Booking & Checkout Page (`/booking/:id` or `/booking`)
- **Vehicle Switcher**: Easily switch or confirm the selected vehicle.
- **Rental Schedule**: Pickup and return locations, dates, and time slot selections with date validation.
- **Driver Information Form**: First/last name, email, phone, driver's license number, notes, and 21+ age verification.
- **Optional Add-ons**:
  - Full Damage Waiver / Zero Security Deposit (`+$39/day`).
  - Unlimited Mileage Package (`+$25/day`).
  - Additional Authorized Driver (`+$15/day`).
- **Dynamic Price Calculation**:
  - Base vehicle rental (Rate × Duration).
  - Add-ons total.
  - Promo code discounts (Use coupon `DRIVE20` for 20% off or `VIP50` for 15% off).
  - Taxes and airport concession fees.
  - Grand total updated in real-time.
- **Payment Methods**: Card payment with format validation, Apple Pay, or Pay Upon Concierge Delivery.
- **Booking Confirmation Modal / Screen**:
  - Generates unique reference code (e.g., `CRB-849204`).
  - Shows full reservation itinerary.
  - "Print Rental Voucher" functionality.
  - Direct link to view in **My Reservations**.

### 5. 📅 My Bookings Page (`/my-bookings`)
- Lists all active and past reservations saved locally in `localStorage`.
- Booking status pills (`Confirmed & Active` / `Cancelled`).
- Full pickup & return schedules, total price, and car specs.
- "Print Voucher" and "Cancel Reservation" (with free 48-hr policy) actions.

---

## 🛠️ Technology Stack

- **React 19**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router DOM v7**
- **Lucide React** (Vehicle, navigation, and feature icons)
- **Local Storage API** (Persistent bookings and favorited vehicles)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Linting
```bash
npm run lint
```
