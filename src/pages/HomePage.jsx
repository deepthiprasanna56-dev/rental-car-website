import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { CarCard } from '../components/CarCard';
import { FeaturedBanner } from '../components/FeaturedBanner';
import { HowItWorks } from '../components/HowItWorks';
import { TestimonialSection } from '../components/TestimonialSection';
import { FAQSection } from '../components/FAQSection';
import { CARS_DATA } from '../data/carsData';
import { ArrowRight } from 'lucide-react';

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('featured'); // 'featured' | 'popular'

  const displayedCars = CARS_DATA.filter(car => 
    activeTab === 'featured' ? car.featured : car.popular
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#070708]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Our Featured Cars Section (Matching Reference Image) */}
      <section className="py-20 bg-[#070708] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Our Featured Cars
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Tabs */}
              <div className="flex items-center gap-1 bg-[#0f0f12] p-1 rounded-xl border border-white/8 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('featured')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'featured'
                      ? 'bg-red-600 text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Featured
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('popular')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'popular'
                      ? 'bg-red-600 text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Most Popular
                </button>
              </div>

              {/* View All Cars Link */}
              <Link 
                to="/cars" 
                className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <span>View All Cars</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4 Cards Grid Matching Reference Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

        </div>
      </section>

      {/* 3. The DriveLux Advantage */}
      <FeaturedBanner />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Testimonials */}
      <TestimonialSection />

      {/* 6. FAQ Section */}
      <FAQSection />

      {/* 7. Bottom Red Drive Banner & Special Offers */}
      <section id="offers" className="py-16 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white relative overflow-hidden shadow-2xl scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 text-white text-[11px] font-bold uppercase tracking-wider mb-3 backdrop-blur-sm border border-white/20">
              <span>Special Offer: Use Code <strong>DRIVELUX20</strong> for 20% Off</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Ready to Drive Your Dream Car?
            </h2>
            <p className="text-red-100 font-medium text-sm sm:text-base mt-2 max-w-xl">
              Book online in 60 seconds. Doorstep delivery, full insurance, and zero cancellation penalties up to 48 hours.
            </p>
          </div>

          <Link
            to="/cars"
            className="whitespace-nowrap px-8 py-4 rounded-xl bg-white hover:bg-gray-100 text-[#070708] font-black text-xs uppercase tracking-wider shadow-2xl transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>Book Your Luxury Ride</span>
            <ArrowRight className="w-4 h-4 text-red-600" />
          </Link>
        </div>
      </section>
    </div>
  );
};
