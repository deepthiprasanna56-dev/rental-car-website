import { 
  RotateCcw, 
  Search, 
  SlidersHorizontal,
  X 
} from 'lucide-react';
import { CAR_TYPES, BRANDS, TRANSMISSIONS } from '../data/carsData';
import { useBooking } from '../context/BookingContext';

export const FilterSidebar = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedBrand,
  setSelectedBrand,
  selectedTransmission,
  setSelectedTransmission,
  maxPrice,
  setMaxPrice,
  availabilityFilter,
  setAvailabilityFilter,
  onReset,
  totalResults,
  isMobileModal = false,
  onCloseMobile
}) => {
  const { currency, formatPrice } = useBooking();
  const isINR = currency === 'INR';
  const minSlider = isINR ? 3000 : 90;
  const maxSlider = isINR ? 75000 : 900;
  const stepSlider = isINR ? 1000 : 10;

  return (
    <div className="bg-[#0f0f12] border border-white/8 rounded-2xl p-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/8 mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-red-500" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            Filter By
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          {isMobileModal && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg bg-white/5 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Search Input */}
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-2">
            Search Keyword
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cars..."
              className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl pl-9 pr-8 py-2.5 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Car Type (Checkboxes / List matching reference) */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
            Car Type
          </label>
          <div className="space-y-2">
            {CAR_TYPES.map((type) => (
              <label 
                key={type}
                className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-white cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedType === type}
                  onChange={() => setSelectedType(selectedType === type ? 'All' : type)}
                  className="w-4 h-4 rounded text-red-600 bg-[#070708] border-white/20 focus:ring-0 focus:ring-offset-0 accent-red-600 cursor-pointer"
                />
                <span className={selectedType === type ? 'text-red-400 font-bold' : ''}>
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand (Checkboxes matching reference) */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
            Brand
          </label>
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {BRANDS.map((brand) => (
              <label 
                key={brand}
                className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-white cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedBrand === brand}
                  onChange={() => setSelectedBrand(selectedBrand === brand ? 'All' : brand)}
                  className="w-4 h-4 rounded text-red-600 bg-[#070708] border-white/20 focus:ring-0 focus:ring-offset-0 accent-red-600 cursor-pointer"
                />
                <span className={selectedBrand === brand ? 'text-red-400 font-bold' : ''}>
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Price Range
            </label>
            <span className="text-xs font-bold text-red-500 font-mono">
              Up to {formatPrice(maxPrice, maxPrice)}/day
            </span>
          </div>
          <input
            type="range"
            min={minSlider}
            max={maxSlider}
            step={stepSlider}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-[#1a1a22] rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
            <span>{formatPrice(minSlider, minSlider)}</span>
            <span>{formatPrice(maxSlider, maxSlider)}</span>
          </div>
        </div>

        {/* Transmission */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
            Transmission
          </label>
          <div className="space-y-2">
            {TRANSMISSIONS.map((trans) => (
              <label 
                key={trans}
                className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-white cursor-pointer"
              >
                <input
                  type="radio"
                  name="transmission"
                  checked={selectedTransmission === trans}
                  onChange={() => setSelectedTransmission(trans)}
                  className="w-4 h-4 text-red-600 bg-[#070708] border-white/20 focus:ring-0 focus:ring-offset-0 accent-red-600 cursor-pointer"
                />
                <span className={selectedTransmission === trans ? 'text-red-400 font-bold' : ''}>
                  {trans}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div className="pt-2 border-t border-white/8">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-xs font-semibold text-gray-300 group-hover:text-white">
              Available Only
            </span>
            <input
              type="checkbox"
              checked={availabilityFilter === 'Available'}
              onChange={(e) => setAvailabilityFilter(e.target.checked ? 'Available' : 'All')}
              className="w-4 h-4 rounded text-red-600 bg-[#070708] border-white/20 focus:ring-0 focus:ring-offset-0 accent-red-600 cursor-pointer"
            />
          </label>
        </div>

        {isMobileModal && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs shadow-lg shadow-red-600/30 cursor-pointer"
          >
            Show {totalResults} Results
          </button>
        )}
      </div>
    </div>
  );
};
