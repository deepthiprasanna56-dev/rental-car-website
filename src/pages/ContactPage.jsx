import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Car,
  Headphones
} from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: 'Deepthi Prasanna',
    email: 'deepthi@gmail.com',
    phone: '+91 98765 43210',
    subject: 'Booking Assistance',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#070708]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Headphones className="w-3.5 h-3.5" />
            <span>24/7 VIP Concierge & Fleet Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Contact <span className="text-red-500">DriveLux</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Have a question about vehicle availability, custom chauffeur routes, or corporate charters? Our dedicated fleet advisors are on call around the clock.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Hubs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-[#0f0f12] p-6 sm:p-8 rounded-2xl border border-white/8 shadow-2xl">
              <h3 className="text-base font-bold text-white mb-6 pb-3 border-b border-white/8 flex items-center gap-2">
                <Car className="w-4 h-4 text-red-500" />
                <span>Direct Concierge Lines</span>
              </h3>

              <div className="space-y-5 text-xs sm:text-sm">
                <a 
                  href="tel:+18005555898"
                  className="flex items-start gap-4 p-3.5 rounded-xl bg-[#070708] border border-white/5 hover:border-red-500/40 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block group-hover:text-red-400 transition-colors font-bold">Toll-Free Phone</strong>
                    <span className="text-gray-400">+1 (800) 555-LUXURY / +91 98765 43210</span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">● Available 24 Hours</span>
                  </div>
                </a>

                <a 
                  href="mailto:concierge@drivelux.com"
                  className="flex items-start gap-4 p-3.5 rounded-xl bg-[#070708] border border-white/5 hover:border-red-500/40 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block group-hover:text-red-400 transition-colors font-bold">VIP Email Desk</strong>
                    <span className="text-gray-400">concierge@drivelux.com</span>
                    <span className="text-[10px] text-gray-500 block mt-0.5">Response within 15 minutes</span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#070708] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold">Operating Schedule</strong>
                    <span className="text-gray-400">24 Hours / 7 Days a Week</span>
                    <span className="text-[10px] text-gray-500 block mt-0.5">Continuous roadside assistance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* City Hub Locations */}
            <div className="bg-[#0f0f12] p-6 rounded-2xl border border-white/8 shadow-2xl">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Primary Fleet Hubs</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#070708] border border-white/5">
                  <span className="font-bold text-white block">Bengaluru</span>
                  <span className="text-gray-400 text-[11px]">Indiranagar & Airport VIP</span>
                </div>
                <div className="p-3 rounded-xl bg-[#070708] border border-white/5">
                  <span className="font-bold text-white block">Mumbai</span>
                  <span className="text-gray-400 text-[11px]">BKC & Terminal 2</span>
                </div>
                <div className="p-3 rounded-xl bg-[#070708] border border-white/5">
                  <span className="font-bold text-white block">New Delhi</span>
                  <span className="text-gray-400 text-[11px]">Aerocity & Gurgaon</span>
                </div>
                <div className="p-3 rounded-xl bg-[#070708] border border-white/5">
                  <span className="font-bold text-white block">Dubai</span>
                  <span className="text-gray-400 text-[11px]">Downtown & Marina</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Interactive Message Form */}
          <div className="lg:col-span-7 bg-[#0f0f12] p-6 sm:p-8 rounded-2xl border border-white/8 shadow-2xl">
            
            <h3 className="text-base font-bold text-white pb-3 border-b border-white/8 mb-6 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-red-500" />
              <span>Send a Message to Concierge</span>
            </h3>

            {submitted ? (
              <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3 animate-fade-in my-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Dispatched!</h4>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been sent to our on-duty fleet manager. A concierge agent will respond to <strong>{formData.email}</strong> within 15 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl px-4 py-3 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl px-4 py-3 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl px-4 py-3 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl px-4 py-3 focus:outline-none cursor-pointer"
                    >
                      <option value="Booking Assistance">Booking Assistance</option>
                      <option value="Chauffeur Service">Private Chauffeur Service</option>
                      <option value="Corporate Fleet Charter">Corporate Fleet Charter</option>
                      <option value="Airport VIP Handover">Airport VIP Handover</option>
                      <option value="Emergency Roadside Support">Emergency Roadside Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us your dates, preferred supercar model, or delivery destination..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#070708] border border-white/10 focus:border-red-500 text-white text-xs rounded-xl p-4 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-red-600/30 hover:shadow-red-600/50 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to VIP Concierge</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
