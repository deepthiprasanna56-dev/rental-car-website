import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CARS_DATA } from '../data/carsData';
import { CarCard } from '../components/CarCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { useBooking } from '../context/BookingContext';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  Car,
  ChevronRight
} from 'lucide-react';

export const CarsListingPage = () => {
  const { searchParams: contextSearchParams, currency, getPriceValue } = useBooking();
  const [urlParams, setUrlParams] = useSearchParams();

  // Initial category & search from URL query param or context
  const initialCategory = urlParams.get('type') || contextSearchParams.carType || 'All';
  const initialSearch = urlParams.get('search') || '';

  // Currency-aware price limit default
  const defaultMaxPrice = currency === 'INR' ? 75000 : 900;

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [customMaxPrice, setCustomMaxPrice] = useState(null);
  const maxPrice = customMaxPrice !== null ? customMaxPrice : defaultMaxPrice;
  const setMaxPrice = (val) => setCustomMaxPrice(val);
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('price-asc'); // 'featured', 'price-asc', 'price-desc', 'rating', 'name'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // When selectedType changes, also update URL param for bookmarkability
  const handleTypeChange = (type) => {
    setSelectedType(type);
    if (type === 'All') {
      urlParams.delete('type');
      setUrlParams(urlParams);
    } else {
      setUrlParams({ type });
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedBrand('All');
    setSelectedTransmission('All');
    setCustomMaxPrice(null);
    setAvailabilityFilter('All');
    setSortBy('price-asc');
    setUrlParams({});
  };

  // Filtered and sorted cars
  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // Keyword search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesBrand = car.brand.toLowerCase().includes(query);
        const matchesModel = car.model.toLowerCase().includes(query);
        const matchesType = car.type.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesModel && !matchesType) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== 'All' && car.type.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'All' && car.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // Transmission
      if (selectedTransmission !== 'All' && car.transmission.toLowerCase() !== selectedTransmission.toLowerCase()) {
        return false;
      }

      // Max price based on active currency
      const carRate = getPriceValue(car.pricePerDayUSD, car.pricePerDayINR);
      if (carRate > maxPrice) {
        return false;
      }

      // Availability
      if (availabilityFilter === 'Available' && car.availability !== 'Available') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = getPriceValue(a.pricePerDayUSD, a.pricePerDayINR);
      const priceB = getPriceValue(b.pricePerDayUSD, b.pricePerDayINR);

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    searchQuery,
    selectedType,
    selectedBrand,
    selectedTransmission,
    maxPrice,
    availabilityFilter,
    sortBy,
    getPriceValue
  ]);

  // Active filter count for badge
  const activeFiltersCount = [
    selectedType !== 'All',
    selectedBrand !== 'All',
    selectedTransmission !== 'All',
    maxPrice < defaultMaxPrice,
    availabilityFilter !== 'All',
    Boolean(searchQuery.trim())
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#070708]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb matching reference image */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
          <Link to="/" className="text-red-500 hover:underline">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span className="text-gray-400">Cars</span>
        </div>

        {/* Page Top Header Matching Reference Image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Our Rental Cars
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Find the perfect ride for your journey
            </p>
          </div>

          {/* Right Sort Dropdown Matching Reference Image */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#0f0f12] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-red-500" />
              <label htmlFor="sort" className="font-semibold whitespace-nowrap">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="price-asc" className="bg-[#0f0f12] text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-[#0f0f12] text-white">Price: High to Low</option>
                <option value="featured" className="bg-[#0f0f12] text-white">Featured First</option>
                <option value="rating" className="bg-[#0f0f12] text-white">Highest Rating</option>
                <option value="name" className="bg-[#0f0f12] text-white">Name (A-Z)</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md shadow-red-600/30 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({activeFiltersCount})</span>
            </button>
          </div>
        </div>

        {/* Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-gray-400">
              {filteredCars.length} cars found
            </span>
            {selectedType !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600/15 text-red-400 text-xs font-semibold border border-red-500/20">
                {selectedType}
                <button onClick={() => handleTypeChange('All')} className="cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedBrand !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 text-xs font-semibold border border-white/10">
                {selectedBrand}
                <button onClick={() => setSelectedBrand('All')} className="cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs text-gray-400 hover:text-red-400 underline cursor-pointer ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main Content Layout: Left Filter Sidebar + Right Cars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <FilterSidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedType={selectedType}
                setSelectedType={handleTypeChange}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedTransmission={selectedTransmission}
                setSelectedTransmission={setSelectedTransmission}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                availabilityFilter={availabilityFilter}
                setAvailabilityFilter={setAvailabilityFilter}
                onReset={handleResetFilters}
                totalResults={filteredCars.length}
              />
            </div>
          </div>

          {/* Right Cars Grid (3 Columns) */}
          <div className="lg:col-span-3">
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-[#0f0f12] border border-white/8 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4 my-10 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-red-500 mx-auto">
                  <Car className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">No Luxury Cars Match Your Filter</h3>
                <p className="text-xs text-gray-400">
                  Try adjusting your price range or clearing selected brand filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Slide-out Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden animate-fade-in">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm bg-[#0a0a0d] h-full overflow-y-auto p-4 shadow-2xl">
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedType={selectedType}
              setSelectedType={handleTypeChange}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedTransmission={selectedTransmission}
              setSelectedTransmission={setSelectedTransmission}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              availabilityFilter={availabilityFilter}
              setAvailabilityFilter={setAvailabilityFilter}
              onReset={handleResetFilters}
              totalResults={filteredCars.length}
              isMobileModal={true}
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};
