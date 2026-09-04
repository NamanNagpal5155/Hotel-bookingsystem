'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { FiSearch, FiMapPin, FiStar, FiWifi, FiWind, FiTruck, FiCoffee, FiClock, FiUsers, FiDollarSign, FiFilter, FiX } from 'react-icons/fi';
import { FaSwimmingPool, FaDumbbell, FaSpa, FaConciergeBell, FaSnowflake, FaPaw } from 'react-icons/fa';
import { PageLoader } from '@/components/Loader';

const amenityIcons = {
  wifi: FiWifi,
  ac: FaSnowflake,
  parking: FiTruck,
  pool: FaSwimmingPool,
  gym: FaDumbbell,
  restaurant: FiCoffee,
  spa: FaSpa,
  roomService: FaConciergeBell,
  laundry: FiClock,
  petFriendly: FaPaw,
};

const amenityLabels = {
  wifi: 'Free WiFi',
  ac: 'Air Conditioning',
  parking: 'Free Parking',
  pool: 'Swimming Pool',
  gym: 'Fitness Center',
  restaurant: 'Restaurant',
  spa: 'Spa & Wellness',
  roomService: 'Room Service',
  laundry: 'Laundry',
  petFriendly: 'Pet Friendly',
};

export default function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hotels-demo');
      const data = await res.json();
      setHotels(data.hotels || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    if (filters.search && !hotel.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !hotel.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.location && !hotel.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.minPrice && hotel.price < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && hotel.price > parseInt(filters.maxPrice)) {
      return false;
    }
    if (filters.minRating && hotel.rating < parseFloat(filters.minRating)) {
      return false;
    }
    return true;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect
              <span className="block text-yellow-300">Stay</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
              Discover the best hotels at unbeatable prices
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Hotels</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search by name or description..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="City or area"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                <select
                  name="minRating"
                  value={filters.minRating}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                >
                  <option value="">All Ratings</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <FiFilter />
                <span>More Filters</span>
              </button>
              {(filters.search || filters.location || filters.minRating) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiX />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Min Price ($/night)</label>
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Price ($/night)</label>
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="10000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8 text-primary-200"
          >
            <p className="text-lg">{filteredHotels.length} hotels found</p>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <PageLoader />
          ) : filteredHotels.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No hotels found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {filteredHotels.map((hotel, index) => (
                <motion.div
                  key={hotel._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="relative h-64 lg:h-auto">
                      <img
                        src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                        <FiStar className="text-yellow-500 fill-current" />
                        <span className="font-semibold text-sm">{hotel.rating.toFixed(1)}</span>
                      </div>
                      {hotel.availableRooms <= 5 && hotel.availableRooms > 0 && (
                        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Only {hotel.availableRooms} left!
                        </div>
                      )}
                      {hotel.availableRooms === 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Sold Out
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-2 p-6">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                              <div className="flex items-center text-gray-600 mb-4">
                                <FiMapPin className="mr-1" />
                                <span>{hotel.location}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-baseline">
                                <span className="text-3xl font-bold text-primary-600">${hotel.price}</span>
                                <span className="text-gray-500 ml-1">/night</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-6 line-clamp-3">{hotel.description}</p>

                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                              {hotel.amenities?.map((amenity, idx) => {
                                const Icon = amenityIcons[amenity];
                                return (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                  >
                                    {Icon && <Icon className="text-primary-600" />}
                                    <span>{amenityLabels[amenity] || amenity}</span>
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-gray-900">{hotel.totalRooms}</p>
                              <p className="text-sm text-gray-600">Total Rooms</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-primary-600">{hotel.availableRooms}</p>
                              <p className="text-sm text-gray-600">Available</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                                <FiUsers className="mr-1" />10
                              </p>
                              <p className="text-sm text-gray-600">Max Guests</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                                <FiDollarSign className="mr-1" />{hotel.price * 3}+
                              </p>
                              <p className="text-sm text-gray-600">3-Night Stay</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                          <Link
                            href={`/hotels/${hotel._id}`}
                            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
                          >
                            View Details
                          </Link>
                          <Link
                            href={`/hotels/${hotel._id}`}
                            className="flex-1 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors text-center"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Book Your Stay?</h2>
            <p className="text-xl text-primary-200 mb-8">
              Join thousands of happy travelers who trust HotelBook
            </p>
            <Link
              href="/register"
              className="inline-block bg-white text-primary-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HotelBook</h3>
              <p className="text-gray-400">Your trusted partner for perfect hotel bookings.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/hotels" className="hover:text-white transition-colors">Hotels</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><span className="hover:text-white transition-colors cursor-pointer">Help Center</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Contact Us</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">FAQs</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Cookie Policy</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HotelBook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
