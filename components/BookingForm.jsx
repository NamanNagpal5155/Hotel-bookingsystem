'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BookingForm({ hotel, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const diffTime = checkOut - checkIn;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    return calculateNights() * hotel.price;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const tonight = new Date().toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg sticky top-24"
    >
      <h3 className="text-2xl font-bold mb-6">Book This Hotel</h3>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-primary-600">${hotel.price}</span>
          <span className="text-gray-500 ml-1">/night</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            min={tonight}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out Date
          </label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            min={formData.checkIn || tonight}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Guests
          </label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="input-field"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        {calculateNights() > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t pt-4 mt-4"
          >
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">
                ${hotel.price} x {calculateNights()} night{calculateNights() > 1 ? 's' : ''}
              </span>
              <span className="font-semibold">${calculateTotal()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-primary-600">${calculateTotal()}</span>
            </div>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading || calculateNights() === 0 || hotel.availableRooms === 0}
          className="btn-primary w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Booking...' : hotel.availableRooms === 0 ? 'Sold Out' : 'Book Now'}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Free cancellation up to 24 hours before check-in
      </p>
    </motion.div>
  );
}
