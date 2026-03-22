'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BookingForm from '@/components/BookingForm';
import { PageLoader } from '@/components/Loader';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { FiMapPin, FiStar, FiWifi, FiWind, FiCar, FiCoffee, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import { FaSwimmingPool, FaDumbbell, FaSpa, FaConciergeBell, FaSnowflake, FaPaw } from 'react-icons/fa';

const amenityIcons = {
  wifi: FiWifi,
  ac: FaSnowflake,
  parking: FiCar,
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
  laundry: 'Laundry Service',
  petFriendly: 'Pet Friendly',
};

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchHotel();
  }, [params.id]);

  const fetchHotel = async () => {
    try {
      const res = await fetch(`/api/hotels-demo/${params.id}`);
      const data = await res.json();
      setHotel(data.hotel);
    } catch (error) {
      console.error('Error fetching hotel:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (bookingData) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setBookingLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          hotelId: hotel._id,
          hotelName: hotel.name,
          price: hotel.price,
          ...bookingData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      alert('Booking successful!');
      router.push('/dashboard');
    } catch (error) {
      alert(error.message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <PageLoader />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Hotel not found</h2>
          <Link href="/hotels" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Browse all hotels
          </Link>
        </div>
      </div>
    );
  }

  const images = hotel.images?.length > 0 
    ? hotel.images 
    : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link href="/hotels" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Back to hotels
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <img
                    src={images[selectedImage]}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <FiStar className="text-yellow-500 fill-current" />
                    <span className="font-semibold">{hotel.rating.toFixed(1)}</span>
                  </div>
                </div>

                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(idx)}
                        className={`h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === idx ? 'border-primary-600' : 'border-transparent'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </motion.button>
                    ))}
                  </div>
                )}

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                      <div className="flex items-center text-gray-600">
                        <FiMapPin className="mr-1" />
                        <span>{hotel.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{hotel.description}</p>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hotel.amenities?.map((amenity, idx) => {
                        const Icon = amenityIcons[amenity] || FiCoffee;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <Icon className="text-primary-600 text-xl" />
                            <span className="text-gray-700">{amenityLabels[amenity] || amenity}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Room Availability</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-600">Available Rooms</p>
                      <p className="text-2xl font-bold text-primary-600">{hotel.availableRooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Rooms</p>
                      <p className="text-2xl font-bold text-gray-900">{hotel.totalRooms}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <BookingForm hotel={hotel} onSubmit={handleBooking} loading={bookingLoading} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
