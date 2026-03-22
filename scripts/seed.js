const mongoose = require('mongoose');
const Hotel = require('./models/Hotel');

const sampleHotels = [
  {
    name: 'Grand Palace Hotel & Spa',
    location: 'Mumbai, India',
    price: 250,
    rating: 4.8,
    description: 'Experience luxury at its finest in the heart of Mumbai. The Grand Palace offers world-class amenities, stunning views of the Arabian Sea, and exceptional service that will make your stay unforgettable.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'gym', 'spa', 'restaurant', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200'
    ],
    availableRooms: 8,
    totalRooms: 15,
  },
  {
    name: 'Seaside Resort & Beach Club',
    location: 'Goa, India',
    price: 180,
    rating: 4.6,
    description: 'Wake up to the sound of waves at our beautiful beachfront resort. Perfect for families and couples alike, with direct beach access, multiple pools, and exciting water sports activities.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'restaurant', 'spa', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200'
    ],
    availableRooms: 12,
    totalRooms: 20,
  },
  {
    name: 'Mountain View Lodge',
    location: 'Manali, India',
    price: 150,
    rating: 4.5,
    description: 'Escape to the serene mountains with breathtaking views of the Himalayas. Our cozy lodge offers a perfect retreat with fireplace, hot tub, and guided treks through scenic trails.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry', 'petFriendly'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200'
    ],
    availableRooms: 5,
    totalRooms: 8,
  },
  {
    name: 'Urban Business Hotel',
    location: 'Delhi, India',
    price: 120,
    rating: 4.3,
    description: 'Modern business hotel in the heart of Delhi with state-of-the-art conference facilities, high-speed internet, and convenient access to business districts and tourist attractions.',
    amenities: ['wifi', 'ac', 'parking', 'gym', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 15,
    totalRooms: 25,
  },
  {
    name: 'Heritage Haveli',
    location: 'Jaipur, India',
    price: 200,
    rating: 4.7,
    description: 'Step back in time at our beautifully restored Rajasthani haveli. Experience traditional hospitality with modern comforts, intricate architecture, and authentic cuisine.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'spa', 'restaurant', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 6,
    totalRooms: 10,
  },
  {
    name: 'Tropical Garden Resort',
    location: 'Kerala, India',
    price: 175,
    rating: 4.6,
    description: 'Immerse yourself in the lush greenery of Kerala. Our eco-friendly resort offers Ayurvedic treatments, backwater cruises, and organic farm-to-table dining experiences.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'spa', 'restaurant', 'roomService', 'laundry', 'petFriendly'],
    images: [
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=1200',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200'
    ],
    availableRooms: 10,
    totalRooms: 15,
  },
  {
    name: 'Budget Inn Express',
    location: 'Bangalore, India',
    price: 65,
    rating: 4.0,
    description: 'Clean, comfortable, and affordable accommodation perfect for budget travelers. Located near major tech parks and shopping districts with easy access to public transportation.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200'
    ],
    availableRooms: 20,
    totalRooms: 30,
  },
  {
    name: 'Lakefront Luxury Suites',
    location: 'Udaipur, India',
    price: 280,
    rating: 4.9,
    description: 'Stunning lakeside property with panoramic views of Lake Pichola. Each suite features private balconies, premium amenities, and personalized butler service for a royal experience.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'gym', 'spa', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'
    ],
    availableRooms: 4,
    totalRooms: 8,
  },
  {
    name: 'Adventure Base Camp',
    location: 'Rishikesh, India',
    price: 95,
    rating: 4.4,
    description: 'Perfect for adventure seekers and yoga enthusiasts. Our base camp offers river rafting, bungee jumping, yoga retreats, and trekking expeditions to nearby mountain peaks.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf4?w=1200'
    ],
    availableRooms: 12,
    totalRooms: 18,
  },
  {
    name: 'City Center Boutique Hotel',
    location: 'Chennai, India',
    price: 140,
    rating: 4.2,
    description: 'Stylish boutique hotel in the cultural hub of Chennai. Walking distance to museums, temples, and shopping centers. Features contemporary design with South Indian art influences.',
    amenities: ['wifi', 'ac', 'parking', 'gym', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200',
      'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=1200'
    ],
    availableRooms: 9,
    totalRooms: 15,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Hotel.deleteMany({});
    console.log('Cleared existing hotels');

    await Hotel.insertMany(sampleHotels);
    console.log(`Successfully seeded ${sampleHotels.length} hotels`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
