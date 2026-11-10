import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Search, AlertCircle } from 'lucide-react';
import { LOCATIONS, TIME_SLOTS } from '../data/locations';
import { useBooking } from '../context/BookingContext';

export const BookingSearchForm = ({ onSearchComplete }) => {
  const navigate = useNavigate();
  const { searchParams, updateSearchParams, calculateDays } = useBooking();

  const [pickupLocation, setPickupLocation] = useState(searchParams.pickupLocation);
  const [dropoffLocation, setDropoffLocation] = useState(searchParams.dropoffLocation);
  const [pickupDate, setPickupDate] = useState(searchParams.pickupDate);
  const [pickupTime, setPickupTime] = useState(searchParams.pickupTime || '10:00 AM');
  const [dropoffDate, setDropoffDate] = useState(searchParams.dropoffDate);
  const [returnTime, setReturnTime] = useState(searchParams.returnTime || '10:00 AM');
  const [error, setError] = useState('');

  const rentalDays = calculateDays(pickupDate, dropoffDate);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pickupDate || !dropoffDate) {
      setError('Please select both pickup and return dates.');
      return;
    }
    if (new Date(dropoffDate) < new Date(pickupDate)) {
      setError('Return date cannot be earlier than pickup date.');
      return;
    }
    setError('');

    updateSearchParams({
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
      pickupTime,
      returnTime
    });

    if (onSearchComplete) {
      onSearchComplete();
    } else {
      navigate('/cars');
    }
  };

  return (
    <div className="w-full bg-[#0d0d10]/95 border border-white/10 rounded-2xl md:rounded-full p-3 sm:p-4 shadow-2xl backdrop-blur-xl">
      {error && (
        <div className="mb-3 px-4 py-2 rounded-xl bg-red-600/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        
        {/* 1. Pickup Location */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl md:rounded-full hover:bg-white/5 transition-colors border-b lg:border-b-0 lg:border-r border-white/10">
          <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
              Pickup Location
            </label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer truncate"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id} className="bg-[#0f0f12] text-white">
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. Drop-off Location */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl md:rounded-full hover:bg-white/5 transition-colors border-b lg:border-b-0 lg:border-r border-white/10">
          <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
              Drop-off Location
            </label>
            <select
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer truncate"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id} className="bg-[#0f0f12] text-white">
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Pickup Date & Time */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl md:rounded-full hover:bg-white/5 transition-colors border-b lg:border-b-0 lg:border-r border-white/10">
          <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
              Pickup Date & Time
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer [color-scheme:dark]"
              />
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="bg-transparent text-xs font-semibold text-gray-400 focus:outline-none cursor-pointer"
              >
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t} className="bg-[#0f0f12] text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 4. Return Date & Time */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl md:rounded-full hover:bg-white/5 transition-colors">
          <Calendar className="w-4 h-4 text-red-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
              Return Date & Time
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                min={pickupDate}
                className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer [color-scheme:dark]"
              />
              <select
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="bg-transparent text-xs font-semibold text-gray-400 focus:outline-none cursor-pointer"
              >
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t} className="bg-[#0f0f12] text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Action Button */}
        <div className="pt-2 lg:pt-0">
          <button
            type="submit"
            className="w-full lg:w-auto px-7 py-3.5 rounded-xl md:rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all cursor-pointer active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span className="whitespace-nowrap">Search Cars</span>
          </button>
        </div>

      </form>

      {rentalDays > 1 && (
        <div className="mt-2 text-center">
          <span className="text-[11px] text-red-400 font-medium">
            {rentalDays} days duration selected
          </span>
        </div>
      )}
    </div>
  );
};
