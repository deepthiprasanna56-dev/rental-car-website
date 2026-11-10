import { Shield, Award, Clock, DollarSign } from 'lucide-react';

export const FeaturedBanner = () => {
  const features = [
    {
      icon: Award,
      title: 'Top Brand Fleet',
      description: 'Hand-picked supercars and executive sedans maintained to immaculate showroom standards.'
    },
    {
      icon: Clock,
      title: 'Flexible Rental Plans',
      description: 'Daily, weekly, and monthly rates with transparent pricing and zero hidden fees.'
    },
    {
      icon: Shield,
      title: 'Comprehensive Insurance',
      description: 'Every rental includes comprehensive coverage and 24/7 dedicated roadside concierge.'
    },
    {
      icon: DollarSign,
      title: 'Best Rate Guarantee',
      description: 'Competitive luxury rental pricing with instant booking confirmation and free cancellation.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#070708] border-t border-white/5 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            The DriveLux Advantage
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            We deliver an unmatched luxury automotive experience tailored to discerning drivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.title}
                className="bg-[#0f0f12] p-7 rounded-2xl border border-white/6 hover:border-red-600/40 transition-all duration-300 group shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/10 text-red-500 flex items-center justify-center mb-5 group-hover:bg-red-600 group-hover:text-white transition-colors shadow-md">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
