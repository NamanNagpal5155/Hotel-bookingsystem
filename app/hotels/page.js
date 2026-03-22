'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HotelCard from '@/components/HotelCard';
import Filters from '@/components/Filters';
import { PageLoader } from '@/components/Loader';
import { motion } from 'framer-motion';
import { FiGrid, FiList } from 'react-icons/fi';

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalHotels: 0,
  });
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchHotels();
  }, [filters]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await fetch(`/api/hotels-demo?${params.toString()}`);
      const data = await res.json();

      setHotels(data.hotels || []);
      setPagination(data.pagination || {});
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Perfect Hotel</h1>
          <p className="text-gray-600">
            {pagination.totalHotels} hotels available
          </p>
        </motion.div>

        <Filters onFilterChange={handleFilterChange} />

        {loading ? (
          <PageLoader />
        ) : (
          <>
            {hotels.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {hotels.map((hotel, index) => (
                    <HotelCard key={hotel._id} hotel={hotel} index={index} />
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="mt-12 flex justify-center gap-2">
                    {Array.from({ length: pagination.totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setFilters({ ...filters, page: i + 1 });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          pagination.currentPage === i + 1
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-primary-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
