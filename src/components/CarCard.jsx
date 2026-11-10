import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ArrowRight,
  Check,
  Star
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const CarCard = ({ car }) => {
  const { favorites, toggleFavorite, formatPrice } = useBooking();
  const isFavorite = favorites.includes(car.id);
  const [showHeartToast, setShowHeartToast] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(car.id);
    setShowHeartToast(true);
    setTimeout(() => setShowHeartToast(false), 2000);
  };

  const isAvailable = car.availability === 'Available';

  return (
    <div className="group relative bg-[#0f0f12] rounded-2xl border border-white/8 hover:border-red-600/50 shadow-xl hover:shadow-2xl hover:shadow-red-950/20 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Clickable Image Container with Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#070708]">
        <Link to={`/cars/${car.id}`} className="block w-full h-full">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${
            isAvailable
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              : 'bg-red-500/15 text-red-400 border-red-500/30'
          }`}>
            {car.availability}
          </span>

          {/* Heart button */}
          <div className="relative">
            <button
              type="button"
              onClick={handleFavoriteClick}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-md ${
                isFavorite
                  ? 'bg-red-600 text-white shadow-red-600/40'
                  : 'bg-black/60 text-gray-300 hover:text-red-400 border border-white/10 hover:bg-black/80'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>

            {showHeartToast && (
              <span className="absolute -bottom-8 right-0 bg-[#070708] text-[10px] text-white px-2 py-0.5 rounded border border-white/10 whitespace-nowrap shadow-xl flex items-center gap-1 z-20">
                <Check className="w-3 h-3 text-red-500" />
                {isFavorite ? 'Saved' : 'Removed'}
              </span>
            )}
          </div>
        </div>

        {/* Rating overlay bottom left */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-semibold text-white pointer-events-none">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>{car.rating}</span>
          <span className="text-gray-400 font-normal">({car.reviewsCount})</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block">
            {car.brand}
          </span>
          <Link to={`/cars/${car.id}`} className="block">
            <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1 mt-0.5">
              {car.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
            {car.type} • {car.transmission}
          </p>
        </div>

        {/* Pricing & Circular Red Arrow Action Button (Matching Reference Image) */}
        <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-red-500">
                {formatPrice(car.pricePerDayUSD, car.pricePerDayINR)}
              </span>
              <span className="text-xs text-gray-400 font-medium">/ day</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/cars/${car.id}`}
              className="text-xs text-gray-400 hover:text-white font-medium transition-colors"
            >
              Details
            </Link>

            <Link
              to={`/booking/${car.id}`}
              className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all shadow-md shadow-red-600/30 hover:shadow-red-600/50 cursor-pointer active:scale-95"
              aria-label={`Book ${car.name}`}
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
