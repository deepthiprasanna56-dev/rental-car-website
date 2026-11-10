import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Car, 
  Menu, 
  X, 
  Search, 
  Globe, 
  User, 
  LogOut, 
  CheckCircle2, 
  Lock, 
  Mail, 
  ArrowRight,
  Sparkles,
  Phone,
  Send,
  Headphones,
  Clock,
  MapPin
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { CARS_DATA } from '../data/carsData';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Auth form state
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  // Contact modal state
  const [contactMsgSent, setContactMsgSent] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: 'Deepthi Prasanna',
    email: 'deepthi@gmail.com',
    phone: '+91 98765 43210',
    subject: 'Booking Assistance',
    message: ''
  });

  // Live user state from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('drivelux_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Search input & matching cars
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { bookings, currency, toggleCurrency, formatPrice } = useBooking();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link, e) => {
    setMobileMenuOpen(false);
    if (link.name === 'Contact') {
      if (e) e.preventDefault();
      setContactModalOpen(true);
      return;
    }
    if (link.path.startsWith('/#')) {
      const elementId = link.path.replace('/#', '');
      if (location.pathname === '/') {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/#${elementId}`);
      }
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: authMode === 'signup' ? (authName || 'Deepthi Prasanna') : (authName || 'Deepthi Prasanna'),
      email: authEmail || 'deepthi@gmail.com'
    };
    localStorage.setItem('drivelux_user', JSON.stringify(userObj));
    setCurrentUser(userObj);
    setAuthSuccessMsg(authMode === 'signup' ? 'Account created successfully! Welcome to DriveLux.' : 'Welcome back to DriveLux!');
    setTimeout(() => {
      setAuthModalOpen(false);
      setAuthSuccessMsg('');
    }, 1200);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactMsgSent(true);
    setTimeout(() => {
      setContactMsgSent(false);
      setContactModalOpen(false);
    }, 2200);
  };

  const handleLogout = () => {
    localStorage.removeItem('drivelux_user');
    setCurrentUser(null);
  };

  const matchingCars = searchQuery.trim()
    ? CARS_DATA.filter((car) => 
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.type.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : CARS_DATA.slice(0, 4);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/cars' },
    { name: 'My Bookings', path: '/my-bookings', badge: bookings.length > 0 ? bookings.length : null },
    { name: 'About', path: '/#about' },
    { name: 'Offers', path: '/#offers' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-red-950/40 shadow-2xl py-3.5' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:bg-red-500 transition-colors">
                <Car className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Drive<span className="text-red-500">Lux</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path && !link.path.includes('#');
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={(e) => handleNavClick(link, e)}
                    className={`relative text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                      isActive 
                        ? 'text-red-500 font-bold' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
                    )}
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-600 text-white inline-block">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              
              {/* Currency Switcher */}
              <button
                type="button"
                onClick={toggleCurrency}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/50 text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
                title="Toggle Currency (USD / INR)"
              >
                <Globe className="w-3.5 h-3.5 text-gray-400" />
                <span>{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
              </button>

              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Search luxury cars"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* User Account / Login Button */}
              {currentUser ? (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                  <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-[11px] font-bold">
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <span className="text-xs font-bold text-white max-w-[100px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer ml-1"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setAuthModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 cursor-pointer active:scale-95"
                >
                  Login / Sign Up
                </button>
              )}

            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={toggleCurrency}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-red-400 cursor-pointer"
              >
                {currency === 'INR' ? '₹' : '$'}
              </button>

              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white cursor-pointer"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>
              
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#09090b]/98 border-b border-red-950/40 px-4 pt-3 pb-6 mt-3 space-y-3 animate-fade-in shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(link, e)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-3 border-t border-white/10">
              {currentUser ? (
                <div className="flex items-center justify-between px-3 py-2.5 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-white">{currentUser.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-red-400 font-semibold cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode('signin');
                    setAuthModalOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider text-center shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 1. DEDICATED CONTACT CONCIERGE MODAL (Opens instantly when clicking Contact) */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div 
            className="fixed inset-0"
            onClick={() => setContactModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xl bg-[#0f0f12] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/40 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon */}
            <div className="w-12 h-12 rounded-2xl bg-red-600/15 border border-red-500/30 flex items-center justify-center text-red-500 mb-4 shadow-lg shadow-red-600/20">
              <Headphones className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              24/7 VIP Concierge & Support
            </h3>
            <p className="text-xs text-gray-400 mt-1 mb-6">
              Connect directly with our luxury fleet dispatchers for instant reservations or roadside assistance.
            </p>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href="tel:+18005555898"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#070708] border border-white/5 hover:border-red-500/40 transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Call Toll-Free</span>
                  <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors truncate block">
                    +1 (800) 555-LUXURY
                  </span>
                </div>
              </a>

              <a
                href="mailto:concierge@drivelux.com"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#070708] border border-white/5 hover:border-red-500/40 transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Direct Email</span>
                  <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors truncate block">
                    concierge@drivelux.com
                  </span>
                </div>
              </a>
            </div>

            {/* Quick Hub Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6 text-[11px] text-gray-400">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red-500" /> Bengaluru</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red-500" /> Mumbai</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red-500" /> New Delhi</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red-500" /> Dubai</span>
              <span className="ml-auto text-emerald-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Live 24/7
              </span>
            </div>

            {/* Message Sent Feedback */}
            {contactMsgSent ? (
              <div className="p-6 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-center space-y-2 animate-fade-in my-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Message Dispatched!</h4>
                <p className="text-xs text-gray-300">
                  Your inquiry has been routed to our on-duty fleet coordinator. We will reach out within 15 minutes.
                </p>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleContactSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Inquiry Reason
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none cursor-pointer"
                  >
                    <option value="Booking Assistance">Booking Assistance</option>
                    <option value="Chauffeur Service">Private Chauffeur Service</option>
                    <option value="Corporate Fleet Charter">Corporate Fleet Charter</option>
                    <option value="Roadside Support">Roadside Support</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Enter your message or request details..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl p-3 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Concierge</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setContactModalOpen(false);
                      navigate('/contact');
                    }}
                    className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold cursor-pointer border border-white/10"
                  >
                    Full Page →
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 2. FLEET QUICK SEARCH MODAL */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div 
            className="fixed inset-0"
            onClick={() => setSearchModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-2xl bg-[#0f0f12] border border-white/10 rounded-2xl p-6 shadow-2xl shadow-red-950/40">
            
            {/* Search Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Search className="w-4 h-4 text-red-500" />
                <span>Search Luxury Rental Cars</span>
              </div>
              <button 
                onClick={() => setSearchModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="mt-4 relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Ferrari, Mercedes, Lamborghini, Porsche, BMW..."
                className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/cars?search=${encodeURIComponent(searchQuery)}`);
                    setSearchModalOpen(false);
                  }
                }}
              />
            </div>

            {/* Quick Results */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                {searchQuery.trim() ? 'Matching Vehicles' : 'Popular Luxury Models'}
              </span>

              {matchingCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#070708] hover:bg-white/5 border border-white/5 transition-colors cursor-pointer group"
                  onClick={() => {
                    navigate(`/cars/${car.id}`);
                    setSearchModalOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-16 h-10 object-cover rounded-lg border border-white/10"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-red-500 uppercase">{car.brand}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                        {car.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-red-500">
                      {formatPrice(car.pricePerDayUSD, car.pricePerDayINR)}/day
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Navigate Button */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Press Enter to view all results in catalog
              </span>
              <button
                type="button"
                onClick={() => {
                  navigate(searchQuery.trim() ? `/cars?search=${encodeURIComponent(searchQuery)}` : '/cars');
                  setSearchModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Catalog →
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. AUTHENTICATION (LOGIN / SIGN UP) MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div 
            className="fixed inset-0"
            onClick={() => setAuthModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-[#0f0f12] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/40">
            
            {/* Close Button */}
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon */}
            <div className="w-12 h-12 rounded-2xl bg-red-600/15 border border-red-500/30 flex items-center justify-center text-red-500 mb-4 shadow-lg shadow-red-600/20">
              <Car className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              {authMode === 'signin' ? 'Welcome to DriveLux' : 'Create DriveLux Account'}
            </h3>
            <p className="text-xs text-gray-400 mt-1 mb-6">
              {authMode === 'signin' 
                ? 'Sign in to access VIP pricing and manage reservations.' 
                : 'Join our exclusive club for seamless luxury supercar rentals.'}
            </p>

            {/* Tab Switcher */}
            <div className="grid grid-cols-2 gap-1 bg-[#070708] p-1 rounded-xl border border-white/8 mb-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`py-2 rounded-lg transition-colors cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`py-2 rounded-lg transition-colors cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Success Feedback Alert */}
            {authSuccessMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{authSuccessMsg}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {authMode === 'signup' && (
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="e.g. Deepthi Prasanna"
                      className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="e.g. deepthi@gmail.com"
                    className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-red-600 rounded" />
                  <span>Remember me</span>
                </label>
                <span className="hover:text-red-400 cursor-pointer">Forgot password?</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 cursor-pointer active:scale-95 mt-2"
              >
                {authMode === 'signin' ? 'Sign In to DriveLux' : 'Create VIP Account'}
              </button>
            </form>

            {/* Demo Helper Note */}
            <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-gray-400 text-center">
              <Sparkles className="w-3.5 h-3.5 text-red-500 inline mr-1" />
              Demo Ready: Click submit to experience active driver account state.
            </div>

          </div>
        </div>
      )}
    </>
  );
};
