import { Star, Quote } from 'lucide-react';

export const TestimonialSection = () => {
  const reviews = [
    {
      name: 'Aditya Roy',
      role: 'Tech Founder & Supercar Enthusiast',
      car: 'Ferrari 296 GTB',
      rating: 5,
      comment: 'Renting the Ferrari 296 GTB was hands down the best driving experience of my life. The handover was instantaneous, the car was pristine, and the roar of the V6 is unforgettable.'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Luxury Travel Journalist',
      car: 'Mercedes-Benz S-Class',
      rating: 5,
      comment: 'DriveLux offers the highest caliber fleet in the business. The S-Class was immaculate for our weekend summit. Impeccable concierge service from start to finish.'
    },
    {
      name: 'Vikram Malhotra',
      role: 'Private Equity Director',
      car: 'Lamborghini Huracán',
      rating: 5,
      comment: 'Flawless experience. Booking took under two minutes, and having the Huracán delivered right to my hotel doorstep in Bangalore was pure luxury.'
    }
  ];

  return (
    <section className="py-20 bg-[#070708] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
            Client Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            What Our Drivers Say
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            Read verified reviews from executives, collectors, and automotive purists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div 
              key={r.name}
              className="bg-[#0f0f12] p-7 rounded-2xl border border-white/6 hover:border-red-600/30 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-red-500">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/10" />
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic mb-6">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{r.name}</h4>
                  <p className="text-[11px] text-gray-400">{r.role}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600/10 text-red-400 border border-red-500/20">
                  {r.car}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
