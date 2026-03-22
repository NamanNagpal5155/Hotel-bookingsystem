'use client';

import { motion } from 'framer-motion';
import { FaHotel, FaSpinner } from 'react-icons/fa';

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="text-primary-600"
      >
        <FaHotel size={64} />
      </motion.div>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="ml-4 text-2xl font-bold text-primary-600"
      >
        HotelBook
      </motion.div>
    </motion.div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <FaSpinner className="text-primary-600 text-4xl" />
      </motion.div>
    </div>
  );
}
