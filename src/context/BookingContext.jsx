/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext(null);

// Helper for default dates (tomorrow and 3 days later)
const getDefaultDates = () => {
  const today = new Date();
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const returnDate = new Date(today);
  returnDate.setDate(today.getDate() + 4);

  const formatDate = (d) => d.toISOString().split('T')[0];

  return {
    pickupDate: formatDate(tomorrow),
    dropoffDate: formatDate(returnDate)
  };
};

export const BookingProvider = ({ children }) => {
  const defaultDates = getDefaultDates();

  // Currency: 'INR' (₹) or 'USD' ($) - default to USD as in screenshot ($299/day) or toggleable
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem('drivelux_currency') || 'USD';
    } catch {
      return 'USD';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('drivelux_currency', currency);
    } catch (err) {
      console.error(err);
    }
  }, [currency]);

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'INR' ? 'USD' : 'INR');
  };

  const formatPrice = (usd, inr) => {
    if (currency === 'INR') {
      return `₹${Number(inr).toLocaleString('en-IN')}`;
    }
    return `$${Number(usd).toLocaleString('en-US')}`;
  };

  const getPriceValue = (usd, inr) => {
    return currency === 'INR' ? inr : usd;
  };

  const [searchParams, setSearchParams] = useState({
    pickupLocation: 'blr',
    dropoffLocation: 'blr',
    pickupDate: defaultDates.pickupDate,
    dropoffDate: defaultDates.dropoffDate,
    pickupTime: '10:00 AM',
    returnTime: '10:00 AM',
    carType: 'All'
  });

  const [selectedCar, setSelectedCar] = useState(null);

  // Load bookings from localStorage
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('drivelux_luxury_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('drivelux_luxury_bookings', JSON.stringify(bookings));
    } catch (err) {
      console.error('Error saving bookings to localStorage:', err);
    }
  }, [bookings]);

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('drivelux_favorites');
      return saved ? JSON.parse(saved) : ['ferrari-296-gtb'];
    } catch {
      return ['ferrari-296-gtb'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('drivelux_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Error saving favorites to localStorage:', err);
    }
  }, [favorites]);

  const toggleFavorite = (carId) => {
    setFavorites(prev => 
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  const updateSearchParams = (updates) => {
    setSearchParams(prev => ({
      ...prev,
      ...updates
    }));
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 1;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const addBooking = (newBooking) => {
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const enrichedBooking = {
      ...newBooking,
      id: `#DLX${todayStr}${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };
    setBookings(prev => [enrichedBooking, ...prev]);
    return enrichedBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b)
    );
  };

  return (
    <BookingContext.Provider
      value={{
        currency,
        toggleCurrency,
        formatPrice,
        getPriceValue,
        searchParams,
        updateSearchParams,
        selectedCar,
        setSelectedCar,
        bookings,
        addBooking,
        cancelBooking,
        favorites,
        toggleFavorite,
        calculateDays
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
