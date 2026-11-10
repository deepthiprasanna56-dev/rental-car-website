import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { 
  MapPin, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  ExternalLink,
  Car,
  Clock
} from 'lucide-react';

export const MyBookingsPage = () => {
  const { bookings, cancelBooking, formatPrice } = useBooking();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#070708]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              My Reservations
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              View confirmed luxury rentals, digital vouchers, and manage your trips.
            </p>
          </div>

          <Link
            to="/cars"
            className="self-start sm:self-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/30 cursor-pointer transition-transform active:scale-95"
          >
            <span>Book Another Car</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-[#0f0f12] border border-white/8 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden"
              >
                {/* Status Indicator */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-white/8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm font-bold text-red-500 tracking-wider">
                      {b.id}
                    </span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      Booked {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
                    b.status === 'Confirmed'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-500/15 text-red-400 border-red-500/30'
                  }`}>
                    {b.status === 'Confirmed' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirmed & Active</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancelled</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Car & Trip Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Car Image & Name */}
                  <div className="md:col-span-5 flex items-center gap-4">
                    <Link to={`/cars/${b.carId}`} className="block flex-shrink-0 group relative overflow-hidden rounded-xl">
                      <img
                        src={b.carImage}
                        alt={b.carName}
                        className="w-28 h-20 sm:w-36 sm:h-24 object-cover rounded-xl border border-white/10 group-hover:border-red-500 transition-colors shadow-md"
                      />
                    </Link>
                    <div>
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{b.carBrand}</span>
                      <Link to={`/cars/${b.carId}`} className="hover:text-red-400 transition-colors block">
                        <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">{b.carName}</h3>
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {b.carType} • {b.days} {b.days === 1 ? 'Day' : 'Days'}
                      </p>
                      <p className="text-sm font-extrabold text-white mt-1.5 font-mono">
                        Total:{' '}
                        <span className="text-red-500">
                          {b.pricing?.grandTotalUSD && b.pricing?.grandTotalINR
                            ? formatPrice(b.pricing.grandTotalUSD, b.pricing.grandTotalINR)
                            : `$${b.pricing?.grandTotal || '0'}`}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Route & Times */}
                  <div className="md:col-span-4 space-y-2 text-xs bg-[#070708] p-3.5 rounded-xl border border-white/5">
                    <div className="flex items-start gap-2 text-gray-300">
                      <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">Pickup</strong>
                        <span className="text-gray-300">{b.pickupLocation}</span>
                        <span className="text-gray-500 block text-[11px]">{b.pickupDate} at {b.pickupTime}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-300 pt-2 border-t border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">Drop-off</strong>
                        <span className="text-gray-300">{b.dropoffLocation}</span>
                        <span className="text-gray-500 block text-[11px]">{b.dropoffDate} at {b.returnTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-2 justify-center">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                    >
                      <Printer className="w-3.5 h-3.5 text-red-500" />
                      <span>Print Voucher</span>
                    </button>

                    <Link
                      to={`/cars/${b.carId}`}
                      className="px-4 py-2 rounded-xl bg-[#070708] hover:bg-white/5 text-gray-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Vehicle Specs</span>
                    </Link>

                    {b.status === 'Confirmed' ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to cancel this reservation? (Free cancellation up to 48 hours before pickup)')) {
                            cancelBooking(b.id);
                          }
                        }}
                        className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Cancel Reservation
                      </button>
                    ) : (
                      <Link
                        to={`/booking/${b.carId}`}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold text-center transition-colors cursor-pointer shadow-md shadow-red-600/30"
                      >
                        Re-Book Vehicle
                      </Link>
                    )}
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-[#0f0f12] border border-white/8 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4 my-8 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-red-500 mx-auto">
              <Car className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">No Active Reservations</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              You do not have any cars booked currently. Search our available luxury and exotic fleet to schedule your ride!
            </p>
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-red-600/30"
            >
              <span>Explore Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
