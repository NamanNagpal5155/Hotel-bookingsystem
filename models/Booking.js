const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: [true, 'Hotel ID is required'],
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required'],
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required'],
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'At least 1 guest is required'],
    max: [10, 'Maximum 10 guests allowed'],
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters'],
  },
}, {
  timestamps: true,
});

bookingSchema.index({ userId: 1, status: 1 });
bookingSchema.index({ hotelId: 1, status: 1 });

bookingSchema.pre('save', function(next) {
  if (this.checkIn >= this.checkOut) {
    next(new Error('Check-out date must be after check-in date'));
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
