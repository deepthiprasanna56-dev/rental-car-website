import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Copy, Check } from 'lucide-react';

export const Footer = () => {
  const [copiedPromo, setCopiedPromo] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('DRIVELUX20');
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2000);
  };

  return (
    <footer className="bg-[#070708] border-t border-white/8 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Drive<span className="text-red-500">Lux</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              The premier destination for exotic and luxury automotive rentals. Experience unmatched performance with our curated fleet of supercars, grand tourers, and prestige sedans.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-300">
              <div className="flex items-center gap-1.5 text-xs">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>+1 (800) 555-LUXURY</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Mail className="w-3.5 h-3.5 text-red-500" />
                <span>concierge@drivelux.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore Fleet
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/cars?type=Sports%20Car" className="hover:text-red-400 transition-colors">Sports Cars & Supercars</Link></li>
              <li><Link to="/cars?type=Luxury" className="hover:text-red-400 transition-colors">Executive Luxury Sedans</Link></li>
              <li><Link to="/cars?type=SUV" className="hover:text-red-400 transition-colors">Prestige Performance SUVs</Link></li>
              <li><Link to="/cars" className="hover:text-red-400 transition-colors">All Rental Cars</Link></li>
              <li><Link to="/my-bookings" className="hover:text-red-400 transition-colors">My Reservations</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition-colors font-bold text-red-500">24/7 VIP Contact Desk →</Link></li>
            </ul>
          </div>

          {/* Top Cities */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Top Locations
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-red-500" /> Bengaluru Central</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-red-500" /> Mumbai Airport & BKC</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-red-500" /> Delhi NCR & Gurgaon</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-red-500" /> Dubai Downtown & Marina</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-red-500" /> London Mayfair</li>
            </ul>
          </div>

          {/* Legal / Hours */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Concierge Service
            </h4>
            <p className="text-xs leading-relaxed mb-3">
              Available 24 hours a day, 7 days a week for roadside support, private chauffeur dispatch, and reservations.
            </p>
            <div 
              onClick={handleCopyCode}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/50 transition-colors cursor-pointer group"
              title="Click to copy promo code"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-red-400">Promo Code</span>
                {copiedPromo ? (
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Copied!
                  </span>
                ) : (
                  <Copy className="w-3 h-3 text-gray-500 group-hover:text-white" />
                )}
              </div>
              <span className="text-sm font-black text-white font-mono mt-0.5 block">DRIVELUX20</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Click to copy 20% discount code</span>
            </div>
          </div>

        </div>

        <div className="pt-10 mt-10 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} DriveLux Rental Fleet Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer">Terms of Rental</span>
            <span className="hover:text-gray-300 cursor-pointer">Insurance Disclosures</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
