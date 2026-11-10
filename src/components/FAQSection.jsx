import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What are the age and driver license requirements?',
      a: 'Drivers must be at least 21 years old (25 for select supercars like Ferrari and Lamborghini) and hold a valid driver license with a minimum of 2 years of driving experience. International visitors can drive using their country license along with an International Driving Permit (IDP).'
    },
    {
      q: 'Is insurance coverage included with the rental?',
      a: 'Yes, every DriveLux vehicle comes with comprehensive collision damage waiver and third-party liability insurance. We also offer premium zero-deductible coverage tiers during checkout.'
    },
    {
      q: 'How does delivery and collection work?',
      a: 'We offer white-glove delivery directly to your hotel, private residence, or airport terminal. Our concierge conducts a 5-minute walk-around handover and assists with cockpit features.'
    },
    {
      q: 'What is the security deposit and fuel policy?',
      a: 'Security deposits are pre-authorized on your card at pickup and released within 48 hours of return. Vehicles are provided with a full tank of premium fuel and should be returned full.'
    },
    {
      q: 'What is the cancellation policy?',
      a: 'We offer 100% free cancellation on all bookings up to 48 hours prior to your scheduled pickup time with an immediate full refund.'
    }
  ];

  return (
    <section className="py-20 bg-[#0a0a0d] border-t border-white/5 relative scroll-mt-20" id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
            Have Questions?
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            Everything you need to know about renting a luxury vehicle with DriveLux.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-[#0f0f12] border border-white/6 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-red-500 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
