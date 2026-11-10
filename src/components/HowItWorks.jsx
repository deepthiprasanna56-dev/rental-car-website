import { Search, CalendarCheck, KeyRound } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      icon: Search,
      title: 'Choose Your Car',
      description: 'Explore our catalog of Ferrari, Lamborghini, Mercedes, and Porsche models.'
    },
    {
      step: '02',
      icon: CalendarCheck,
      title: 'Book Online',
      description: 'Select your preferred dates and locations with instant digital booking clearance.'
    },
    {
      step: '03',
      icon: KeyRound,
      title: 'Enjoy The Drive',
      description: 'White-glove doorstep delivery or VIP airport concierge handover ready with keys.'
    }
  ];

  return (
    <section className="py-20 bg-[#0a0a0d] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
            Seamless Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            How It Works
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            Rent your dream car in three effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="relative bg-[#0f0f12] p-8 rounded-2xl border border-white/6 hover:border-red-600/30 transition-all text-center flex flex-col items-center shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-red-600/30">
                  <Icon className="w-7 h-7 stroke-[2]" />
                </div>
                <span className="text-xs font-black text-red-500 tracking-widest uppercase mb-1">
                  Step {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
