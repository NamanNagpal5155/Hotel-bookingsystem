'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

export default function Filters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
    });
    onFilterChange({
      search: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-md mb-8"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Hotels
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Search by name or location..."
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="e.g., Mumbai"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="0"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="10000"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Rating
            </label>
            <select
              name="minRating"
              value={filters.minRating}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">All</option>
              <option value="3">3+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="btn-primary flex items-center space-x-2"
          >
            <FiFilter />
            <span>Apply Filters</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
          >
            Reset
          </button>
        </div>
      </form>
    </motion.div>
  );
}
