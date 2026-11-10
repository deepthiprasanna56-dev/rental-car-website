import { Link } from 'react-router-dom';
import { BookingSearchForm } from './BookingSearchForm';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background with Red Supercar over Pedestal & Skyline */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/flying-cars/hero-flying-car.jpg"
          alt="Luxury Crimson Red Supercar on Stage"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-125"
        />
        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/60 to-[#070708]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070708]/90 via-transparent to-transparent" />
        {/* Crimson ambient glow behind car */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 blur-[140px] pointer-events-none rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="max-w-2xl mb-12">
          
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premier Luxury Car Rentals</span>
          </div>

          {/* Headline Matching Reference Image */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Rent <span className="text-red-600">Luxury.</span><br />
            Drive the <span className="text-red-500">Dream.</span>
          </h1>

          {/* Subtitle Matching Reference Image */}
          <p className="text-base sm:text-lg text-gray-300 mt-5 leading-relaxed max-w-lg">
            Experience the thrill of premium rides with our luxury car rental service. Exotic supercars, prestigious sedans, and high-performance SUVs.
          </p>

          {/* Explore Cars CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl shadow-red-600/35 hover:shadow-red-600/50 cursor-pointer active:scale-95"
            >
              <span>Explore Cars</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 text-xs text-gray-400 pl-2">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>Full Insurance & 24/7 Concierge Included</span>
            </div>
          </div>

        </div>

        {/* Floating Horizontal Search Bar */}
        <div className="w-full max-w-6xl mx-auto">
          <BookingSearchForm />
        </div>
      </div>

    </section>
  );
};
