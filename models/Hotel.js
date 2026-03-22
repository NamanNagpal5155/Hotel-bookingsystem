const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true,
    maxlength: [200, 'Hotel name cannot exceed 200 characters'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot exceed 5'],
    default: 0,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  amenities: [{
    type: String,
    enum: ['wifi', 'ac', 'parking', 'pool', 'gym', 'restaurant', 'spa', 'roomService', 'laundry', 'petFriendly'],
  }],
  images: [{
    type: String,
  }],
  availableRooms: {
    type: Number,
    default: 10,
    min: [0, 'Available rooms cannot be negative'],
  },
  totalRooms: {
    type: Number,
    default: 10,
  },
}, {
  timestamps: true,
});

hotelSchema.index({ location: 1, price: 1, rating: -1 });
hotelSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Hotel', hotelSchema);
