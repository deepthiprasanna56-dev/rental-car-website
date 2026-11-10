import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CARS_DATA } from '../data/carsData';
import { useBooking } from '../context/BookingContext';
import { 
  Star, 
  Heart, 
  ArrowRight, 
  Check, 
  Gauge, 
  Fuel, 
  Settings, 
  ChevronRight,
  Zap,
  ArrowLeft
} from 'lucide-react';

export const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, formatPrice } = useBooking();

  // Find car
  const car = CARS_DATA.find((c) => c.id === id) || CARS_DATA[0];
  const isFavorite = favorites.includes(car.id);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [rateTier, setRateTier] = useState('daily'); // 'daily' | 'weekly' | 'monthly'
  const [activeTab, setActiveTab] = useState('features'); // 'features' | 'specifications' | 'reviews'

  const galleryImages = car.gallery && car.gallery.length > 0 ? car.gallery : [car.image];
  const activeImage = galleryImages[selectedImageIndex] || car.image;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#070708]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="text-red-500 hover:underline">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link to="/cars" className="text-red-500 hover:underline">Cars</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-300 font-semibold">{car.name}</span>
        </div>

        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to fleet</span>
        </button>

        {/* Top Split Layout: Left Gallery + Right Booking Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Main Image & Gallery Thumbnails */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Image */}
            <div className="relative aspect-[16/10] w-full bg-[#0f0f12] rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
              <img
                src={activeImage}
                alt={car.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow-lg shadow-red-600/40">
                  {car.type}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip Matching Reference Image */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-red-600 ring-2 ring-red-600/40'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${car.name} preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Car Details & Pricing */}
          <div className="lg:col-span-5 bg-[#0f0f12] p-6 sm:p-8 rounded-2xl border border-white/8 shadow-2xl">
            
            {/* Brand & Name */}
            <div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
                {car.brand}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {car.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-semibold">
                  {car.rating} ({car.reviewsCount} reviews)
                </span>
              </div>
            </div>

            {/* Price Display */}
            <div className="mt-5 pb-5 border-b border-white/8 flex items-baseline gap-2">
              <span className="text-3xl font-black text-red-500">
                {rateTier === 'daily' && formatPrice(car.pricePerDayUSD, car.pricePerDayINR)}
                {rateTier === 'weekly' && formatPrice(car.pricePerWeekUSD, car.pricePerWeekINR)}
                {rateTier === 'monthly' && formatPrice(car.pricePerMonthUSD, car.pricePerMonthINR)}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                / {rateTier === 'daily' ? 'day' : rateTier === 'weekly' ? 'week' : 'month'}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-4">
              {car.description}
            </p>

            {/* 3 Key Specs Matching Reference Image */}
            <div className="grid grid-cols-3 gap-3 my-6 py-4 border-y border-white/8 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                  <Gauge className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">{car.mileage}</div>
                <div className="text-[10px] text-gray-400 font-medium">Mileage</div>
              </div>
              <div className="border-x border-white/8">
                <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                  <Fuel className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">{car.fuelType}</div>
                <div className="text-[10px] text-gray-400 font-medium">Fuel Type</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                  <Settings className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">{car.transmission}</div>
                <div className="text-[10px] text-gray-400 font-medium">Transmission</div>
              </div>
            </div>

            {/* Daily, Weekly, Monthly Tabs Matching Reference Image */}
            <div className="grid grid-cols-3 gap-2 bg-[#070708] p-1.5 rounded-xl border border-white/8 text-center text-xs font-semibold mb-6">
              <button
                type="button"
                onClick={() => setRateTier('daily')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  rateTier === 'daily'
                    ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setRateTier('weekly')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  rateTier === 'weekly'
                    ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setRateTier('monthly')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  rateTier === 'monthly'
                    ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Action Buttons Matching Reference Image */}
            <div className="flex items-center gap-3">
              <Link
                to={`/booking/${car.id}`}
                className="flex-1 py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all cursor-pointer active:scale-95"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => toggleFavorite(car.id)}
                className={`px-4 py-3.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-red-600/10 border-red-500 text-red-400'
                    : 'bg-[#070708] border-white/10 text-gray-300 hover:text-white hover:border-red-500/50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            {/* Speedometer Badge Matching Reference Image */}
            <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Zap className="w-4 h-4 text-red-500" />
                <span className="font-bold text-white">{car.acceleration}</span>
              </div>
              <span className="text-gray-400">Top Speed: {car.topSpeed}</span>
            </div>

          </div>

        </div>

        {/* Bottom Tabs: Features, Specifications, Reviews (Matching Reference Image) */}
        <div className="bg-[#0f0f12] rounded-2xl border border-white/8 p-6 sm:p-8 shadow-2xl">
          
          <div className="flex items-center gap-6 border-b border-white/8 pb-4 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('features')}
              className={`text-sm font-bold pb-2 transition-colors cursor-pointer relative ${
                activeTab === 'features' ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              Features
              {activeTab === 'features' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('specifications')}
              className={`text-sm font-bold pb-2 transition-colors cursor-pointer relative ${
                activeTab === 'specifications' ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              Specifications
              {activeTab === 'specifications' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`text-sm font-bold pb-2 transition-colors cursor-pointer relative ${
                activeTab === 'reviews' ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              Reviews ({car.reviewsCount})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
              )}
            </button>
          </div>

          {/* Features Tab Content */}
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              {car.features.map((feat) => (
                <div key={feat} className="flex items-center gap-3 text-xs sm:text-sm text-gray-200">
                  <div className="w-5 h-5 rounded-full bg-red-600/15 text-red-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}

          {/* Specifications Tab Content */}
          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
              <div className="bg-[#070708] p-4 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Engine</span>
                <span className="text-xs font-bold text-white mt-1 block">{car.engine}</span>
              </div>
              <div className="bg-[#070708] p-4 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Horsepower</span>
                <span className="text-xs font-bold text-white mt-1 block">{car.horsepower}</span>
              </div>
              <div className="bg-[#070708] p-4 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Acceleration</span>
                <span className="text-xs font-bold text-white mt-1 block">{car.acceleration}</span>
              </div>
              <div className="bg-[#070708] p-4 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Top Speed</span>
                <span className="text-xs font-bold text-white mt-1 block">{car.topSpeed}</span>
              </div>
            </div>
          )}

          {/* Reviews Tab Content */}
          {activeTab === 'reviews' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-[#070708] p-5 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white">Rohit Verma</span>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-300">
                  Exceptional vehicle and outstanding condition. Smooth delivery and pickup. Would rent again without hesitation!
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
