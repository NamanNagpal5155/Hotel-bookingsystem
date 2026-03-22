'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiDollarSign } from 'react-icons/fi';

export default function HotelCard({ hotel, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card group cursor-pointer"
    >
      <Link href={`/hotels/${hotel._id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
            <FiStar className="text-yellow-500 fill-current" />
            <span className="font-semibold text-sm">{hotel.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {hotel.name}
          </h3>

          <div className="flex items-center text-gray-600 mb-3">
            <FiMapPin className="mr-1" />
            <span className="text-sm">{hotel.location}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {hotel.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiDollarSign className="text-primary-600" />
              <span className="text-2xl font-bold text-primary-600">
                {hotel.price}
              </span>
              <span className="text-gray-500 text-sm ml-1">/night</span>
            </div>

            <div className="text-sm text-gray-500">
              {hotel.availableRooms} rooms left
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {hotel.amenities?.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md capitalize"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
