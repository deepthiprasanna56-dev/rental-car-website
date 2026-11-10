import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CARS_DATA } from '../data/carsData';
import { LOCATIONS } from '../data/locations';
import { useBooking } from '../context/BookingContext';
import { 
  Check, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Building,
  Smartphone,
  Copy,
  CheckCircle2
} from 'lucide-react';

export const BookingPage = () => {
  const { id } = useParams();
  const { searchParams, addBooking, calculateDays, formatPrice } = useBooking();

  // Find selected car or fallback to first car
  const [selectedCarId] = useState(id || searchParams.selectedCarId || CARS_DATA[0].id);
  const car = CARS_DATA.find((c) => c.id === selectedCarId) || CARS_DATA[0];

  // Schedule & locations
  const [pickupLocation, setPickupLocation] = useState(searchParams.pickupLocation || 'blr');
  const [pickupDate, setPickupDate] = useState(searchParams.pickupDate);
  const pickupTime = searchParams.pickupTime || '10:00 AM';
  const [dropoffDate, setDropoffDate] = useState(searchParams.dropoffDate);
  const returnTime = searchParams.returnTime || '10:00 AM';

  // Multi-step navigation: 1: Booking, 2: Payment, 3: Confirmation
  const [currentStep, setCurrentStep] = useState(1);

  // Form fields
  const [fullName, setFullName] = useState('Deepthi Prasanna');
  const [email, setEmail] = useState('deepthi@gmail.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'netbanking'
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const couponApplied = true;

  // Booking confirmation object
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  // Pricing calculations
  const days = calculateDays(pickupDate, dropoffDate);
  const dailyRateUSD = car.pricePerDayUSD;
  const dailyRateINR = car.pricePerDayINR;

  const baseTotalUSD = dailyRateUSD * days;
  const baseTotalINR = dailyRateINR * days;

  const discountRate = couponApplied ? 0.20 : 0;
  const discountUSD = Math.round(baseTotalUSD * discountRate);
  const discountINR = Math.round(baseTotalINR * discountRate);

  const taxesUSD = Math.round((baseTotalUSD - discountUSD) * 0.12);
  const taxesINR = Math.round((baseTotalINR - discountINR) * 0.12);

  const grandTotalUSD = baseTotalUSD - discountUSD + taxesUSD;
  const grandTotalINR = baseTotalINR - discountINR + taxesINR;

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      carId: car.id,
      carName: car.name,
      carBrand: car.brand,
      carImage: car.image,
      carType: car.type,
      pickupLocation: LOCATIONS.find(l => l.id === pickupLocation)?.name || pickupLocation,
      dropoffLocation: LOCATIONS.find(l => l.id === pickupLocation)?.name || pickupLocation,
      pickupDate,
      dropoffDate,
      pickupTime,
      returnTime,
      days,
      customer: {
        name: fullName,
        email,
        phone
      },
      pricing: {
        grandTotalUSD,
        grandTotalINR,
        grandTotal: grandTotalUSD
      }
    };

    const saved = addBooking(newBooking);
    setConfirmedBooking(saved);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyBookingId = () => {
    if (confirmedBooking?.id) {
      navigator.clipboard.writeText(confirmedBooking.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // ----------------------------------------------------
  // STEP 3: CONFIRMATION SCREEN (Matching Reference Image)
  // ----------------------------------------------------
  if (currentStep === 3 && confirmedBooking) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-[#070708] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-[#0f0f12] rounded-3xl border border-white/8 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          
          {/* Crimson Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-red-600/15 blur-3xl pointer-events-none" />

          {/* Glowing Red Checkmark Circle Matching Reference Image */}
          <div className="w-20 h-20 rounded-full bg-red-600/15 border-2 border-red-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-600/30">
            <Check className="w-10 h-10 text-red-500 stroke-[3]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Booking Confirmed!
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Your luxury ride is booked successfully.
          </p>

          {/* Booking ID Pill */}
          <div className="my-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-mono text-sm font-bold">
            <span>Booking ID: <strong className="text-red-500">{confirmedBooking.id}</strong></span>
            <button
              onClick={handleCopyBookingId}
              className="text-gray-400 hover:text-white cursor-pointer ml-1"
              title="Copy ID"
            >
              {copiedId ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Rear View Supercar Background Image Accent */}
          <div className="relative rounded-2xl overflow-hidden my-6 border border-white/8 shadow-2xl aspect-[16/9] max-h-56">
            <img
              src="/images/flying-cars/hero-flying-car.jpg"
              alt="Confirmed Supercar on Road"
              className="w-full h-full object-cover object-center filter brightness-[0.65]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent flex items-end p-4 justify-between">
              <span className="text-xs font-bold text-white">{car.name}</span>
              <span className="text-xs font-bold text-red-400">{formatPrice(grandTotalUSD, grandTotalINR)} Total</span>
            </div>
          </div>

          {/* Action CTAs Matching Reference Image */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              to="/my-bookings"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 cursor-pointer active:scale-95"
            >
              View Booking Details →
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10 cursor-pointer"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // STEPS 1 & 2: BOOKING DETAILS & PAYMENT FORM
  // ----------------------------------------------------
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#070708]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator Header Matching Reference Image */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Booking Details
          </h1>

          {/* 3 Step Pill Progress */}
          <div className="flex items-center gap-3 mt-4">
            <div className={`flex items-center gap-2 text-xs font-bold ${
              currentStep === 1 ? 'text-red-500' : 'text-gray-400'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                currentStep === 1 ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-400'
              }`}>
                1
              </div>
              <span>Booking</span>
            </div>

            <div className="w-8 h-0.5 bg-white/10" />

            <div className={`flex items-center gap-2 text-xs font-bold ${
              currentStep === 2 ? 'text-red-500' : 'text-gray-400'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                currentStep === 2 ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-400'
              }`}>
                2
              </div>
              <span>Payment</span>
            </div>

            <div className="w-8 h-0.5 bg-white/10" />

            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
              <div className="w-6 h-6 rounded-full bg-white/10 text-gray-400 flex items-center justify-center text-xs">
                3
              </div>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        {/* 2-Column Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main Customer Information Form */}
          <div className="lg:col-span-7 bg-[#0f0f12] rounded-2xl border border-white/8 p-6 sm:p-8 shadow-2xl">
            
            {currentStep === 1 ? (
              <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }}>
                <h3 className="text-base font-bold text-white mb-6 pb-3 border-b border-white/8">
                  Customer Information
                </h3>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Deepthi Prasanna"
                      className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. deepthi@gmail.com"
                      className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Pickup Details Header */}
                  <h3 className="text-base font-bold text-white pt-6 pb-3 border-b border-white/8">
                    Pickup Details
                  </h3>

                  {/* Location Dropdown */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Pickup Location
                    </label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors cursor-pointer"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id} className="bg-[#0f0f12]">
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dates & Times */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                        Pickup Date & Time
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-sm rounded-xl px-4 py-3 focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                        Return Date & Time
                      </label>
                      <input
                        type="date"
                        value={dropoffDate}
                        onChange={(e) => setDropoffDate(e.target.value)}
                        min={pickupDate}
                        className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-sm rounded-xl px-4 py-3 focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Next: Payment CTA */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-red-600/30 hover:shadow-red-600/50 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </form>
            ) : (
              /* Step 2: Payment Form */
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/8">
                  <h3 className="text-base font-bold text-white">
                    Select Payment Method
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>
                </div>

                {/* Payment Option Radio Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-red-500 bg-red-600/10 text-white'
                        : 'border-white/10 bg-[#070708] text-gray-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-2 text-red-500" />
                    <span className="text-xs font-bold block">Credit / Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-red-500 bg-red-600/10 text-white'
                        : 'border-white/10 bg-[#070708] text-gray-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mx-auto mb-2 text-red-500" />
                    <span className="text-xs font-bold block">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'netbanking'
                        ? 'border-red-500 bg-red-600/10 text-white'
                        : 'border-white/10 bg-[#070708] text-gray-400 hover:text-white'
                    }`}
                  >
                    <Building className="w-5 h-5 mx-auto mb-2 text-red-500" />
                    <span className="text-xs font-bold block">Net Banking</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#070708] border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                          Expiry
                        </label>
                        <input
                          type="text"
                          defaultValue="12/28"
                          className="w-full bg-[#070708] border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                          CVV
                        </label>
                        <input
                          type="password"
                          defaultValue="•••"
                          className="w-full bg-[#070708] border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-[#070708] rounded-xl border border-white/10 text-center">
                    <p className="text-xs text-gray-300">Enter your Virtual Payment Address (VPA)</p>
                    <input
                      type="text"
                      defaultValue="deepthi@okhdfcbank"
                      className="mt-2 w-full bg-[#0f0f12] border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 text-center focus:outline-none"
                    />
                  </div>
                )}

                {/* Final Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-red-600/30 hover:shadow-red-600/50 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm & Pay {formatPrice(grandTotalUSD, grandTotalINR)}</span>
                </button>
              </form>
            )}

          </div>

          {/* Right Column / Order Summary */}
          <div className="lg:col-span-5 bg-[#0f0f12] rounded-2xl border border-white/8 p-6 shadow-2xl">
            
            <h3 className="text-base font-bold text-white pb-3 border-b border-white/8 mb-4">
              Booking Summary
            </h3>

            {/* Car Snapshot */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={car.image}
                alt={car.name}
                className="w-24 h-16 object-cover rounded-xl border border-white/10"
              />
              <div>
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">
                  {car.brand}
                </span>
                <h4 className="text-sm font-bold text-white">{car.name}</h4>
                <p className="text-xs text-red-400 font-bold mt-0.5">
                  {formatPrice(dailyRateUSD, dailyRateINR)} / day
                </p>
              </div>
            </div>

            {/* Details List */}
            <div className="space-y-3 text-xs border-y border-white/8 py-4 mb-4">
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-red-500" /> Duration
                </span>
                <span className="font-bold text-white">{days} {days === 1 ? 'Day' : 'Days'}</span>
              </div>

              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> Location
                </span>
                <span className="font-bold text-white truncate max-w-[180px]">
                  {LOCATIONS.find(l => l.id === pickupLocation)?.name || pickupLocation}
                </span>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 text-xs mb-6">
              <div className="flex items-center justify-between text-gray-400">
                <span>Rental Rate ({days} days)</span>
                <span className="font-mono text-white">{formatPrice(baseTotalUSD, baseTotalINR)}</span>
              </div>

              {couponApplied && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span>VIP Promo (20% OFF)</span>
                  <span className="font-mono">-{formatPrice(discountUSD, discountINR)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-gray-400">
                <span>Taxes & Comprehensive Insurance</span>
                <span className="font-mono text-white">{formatPrice(taxesUSD, taxesINR)}</span>
              </div>

              <div className="pt-3 border-t border-white/8 flex items-baseline justify-between text-sm">
                <span className="font-bold text-white">Total Amount</span>
                <span className="text-xl font-black text-red-500 font-mono">
                  {formatPrice(grandTotalUSD, grandTotalINR)}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
