'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/Loader';
import { FiPlus, FiEdit2, FiTrash2, FiHotel, FiUsers, FiCalendar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

export default function AdminPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    rating: '',
    description: '',
    amenities: [],
    images: [''],
    availableRooms: '',
    totalRooms: '',
  });

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      router.push('/');
    } else if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, authLoading, user]);

  const fetchData = async () => {
    try {
      const [hotelsRes, bookingsRes] = await Promise.all([
        fetch('/api/hotels'),
        fetch('/api/booking', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }),
      ]);

      const hotelsData = await hotelsRes.json();
      const bookingsData = await bookingsRes.json();

      setHotels(hotelsData.hotels || []);
      setBookings(bookingsData.bookings || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingHotel ? `/api/hotels/${editingHotel._id}` : '/api/hotels';
      const method = editingHotel ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          rating: parseFloat(formData.rating),
          availableRooms: parseInt(formData.availableRooms),
          totalRooms: parseInt(formData.totalRooms),
          images: formData.images.filter(img => img.trim() !== ''),
        }),
      });

      if (res.ok) {
        fetchData();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      alert('Error saving hotel');
    }
  };

  const handleDelete = async (hotelId) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;

    try {
      const res = await fetch(`/api/hotels/${hotelId}`, { method: 'DELETE' });
      if (res.ok) {
        setHotels(prev => prev.filter(h => h._id !== hotelId));
      }
    } catch (error) {
      alert('Error deleting hotel');
    }
  };

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      location: hotel.location,
      price: hotel.price.toString(),
      rating: hotel.rating.toString(),
      description: hotel.description,
      amenities: hotel.amenities || [],
      images: hotel.images || [''],
      availableRooms: hotel.availableRooms.toString(),
      totalRooms: hotel.totalRooms.toString(),
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingHotel(null);
    setFormData({
      name: '',
      location: '',
      price: '',
      rating: '',
      description: '',
      amenities: [],
      images: [''],
      availableRooms: '',
      totalRooms: '',
    });
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage hotels and bookings</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="btn-primary flex items-center space-x-2"
          >
            <FiPlus />
            <span>Add Hotel</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Hotels</p>
                <p className="text-3xl font-bold text-gray-900">{hotels.length}</p>
              </div>
              <FiHotel className="text-primary-600 text-4xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
              </div>
              <FiCalendar className="text-primary-600 text-4xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-green-600">
                  ${bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)}
                </p>
              </div>
              <FiUsers className="text-green-600 text-4xl" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Hotels Management</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hotel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rooms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {hotels.map((hotel) => (
                  <tr key={hotel._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={hotel.images?.[0] || 'https://via.placeholder.com/50'}
                          alt={hotel.name}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <span className="font-medium text-gray-900">{hotel.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{hotel.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-primary-600">${hotel.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span>{hotel.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{hotel.availableRooms}/{hotel.totalRooms}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(hotel)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(hotel._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-6">{editingHotel ? 'Edit Hotel' : 'Add New Hotel'}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                    min="0"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <input
                    type="number"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available</label>
                    <input
                      type="number"
                      value={formData.availableRooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, availableRooms: e.target.value }))}
                      required
                      min="0"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total</label>
                    <input
                      type="number"
                      value={formData.totalRooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, totalRooms: e.target.value }))}
                      required
                      min="0"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows="4"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.images[0]}
                  onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
                  required
                  placeholder="https://..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {['wifi', 'ac', 'parking', 'pool', 'gym', 'restaurant', 'spa', 'roomService', 'laundry', 'petFriendly'].map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded text-primary-600"
                      />
                      <span className="text-sm capitalize">{amenity.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingHotel ? 'Update Hotel' : 'Add Hotel'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
