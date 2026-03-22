'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/Loader';
import { FiCalendar, FiClock, FiDollarSign, FiX, FiCheck } from 'react-icons/fi';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated, authLoading]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/booking', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    setCancellingId(bookingId);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/booking/${bookingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setBookings(prev =>
          prev.map(b =>
            b._id === bookingId ? { ...b, status: 'cancelled' } : b
          )
        );
        alert('Booking cancelled successfully');
      }
    } catch (error) {
      alert('Error cancelling booking');
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <p className="text-gray-600 text-sm">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
              <FiCheck className="text-green-600 text-4xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-3xl font-bold text-primary-600">
                  ${bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)}
                </p>
              </div>
              <FiDollarSign className="text-primary-600 text-4xl" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">No bookings yet</p>
              <Link href="/hotels" className="btn-primary inline-block">
                Browse Hotels
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {booking.hotelName || booking.hotelId?.name || 'Hotel'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1" />
                          <span>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</span>
                        </div>
                        <div className="flex items-center">
                          <FiClock className="mr-1" />
                          <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center font-semibold text-primary-600">
                          <FiDollarSign className="mr-1" />
                          <span>${booking.totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/hotels/${booking.hotelId?._id || booking.hotelId}`}
                        className="btn-secondary text-sm px-4 py-2"
                      >
                        View Hotel
                      </Link>
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 text-sm flex items-center"
                        >
                          <FiX className="mr-1" />
                          {cancellingId === booking._id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
