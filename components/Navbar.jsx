'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900">HotelBook</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/hotels" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Hotels
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Hi, {user?.name?.split(' ')[0]}</span>
                  <button
                    onClick={logout}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-4 py-4 space-y-3">
            <Link href="/hotels" className="block text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Hotels
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="block text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="block text-gray-700 hover:text-primary-600 transition-colors font-medium">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
