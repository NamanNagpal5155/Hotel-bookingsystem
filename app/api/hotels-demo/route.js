import { NextResponse } from 'next/server';

const sampleHotels = [
  // Maharashtra
  {
    _id: '1',
    name: 'Grand Palace Hotel & Spa',
    location: 'Mumbai, Maharashtra',
    price: 250,
    rating: 4.8,
    description: 'Experience luxury at its finest in the heart of Mumbai. The Grand Palace offers world-class amenities, stunning views of the Arabian Sea, and exceptional service that will make your stay unforgettable. Featuring an award-winning spa, multiple dining options, and rooftop infinity pool.',
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
    _id: '2',
    name: 'Seaside Resort & Beach Club',
    location: 'Goa, Maharashtra',
    price: 180,
    rating: 4.6,
    description: 'Wake up to the sound of waves at our beautiful beachfront resort. Perfect for families and couples alike, with direct beach access, multiple pools, and exciting water sports activities. Our beach club offers live music and fresh seafood daily.',
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
    _id: '3',
    name: 'Maharashtra Heritage Inn',
    location: 'Pune, Maharashtra',
    price: 95,
    rating: 4.3,
    description: 'A perfect blend of modern comfort and traditional Maharashtra hospitality. Located in the heart of Pune with easy access to business districts, shopping areas, and historical sites.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'gym', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200'
    ],
    availableRooms: 18,
    totalRooms: 25,
  },

  // Himachal Pradesh
  {
    _id: '4',
    name: 'Mountain View Lodge',
    location: 'Manali, Himachal Pradesh',
    price: 150,
    rating: 4.5,
    description: 'Escape to the serene mountains with breathtaking views of the Himalayas. Our cozy lodge offers a perfect retreat with fireplace, hot tub, and guided treks through scenic trails. Perfect for adventure seekers and nature lovers.',
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
    _id: '5',
    name: 'Shimla Royal Residency',
    location: 'Shimla, Himachal Pradesh',
    price: 175,
    rating: 4.7,
    description: 'Experience colonial charm meets modern luxury in the queen of hills. Our heritage property offers panoramic views of the snow-capped mountains, traditional Himachali cuisine, and warm hospitality.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'spa', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 10,
    totalRooms: 15,
  },
  {
    _id: '6',
    name: 'Dharamshala Mountain Retreat',
    location: 'Dharamshala, Himachal Pradesh',
    price: 120,
    rating: 4.4,
    description: 'Nestled in the Kangra Valley with views of the Dalai Lama Temple. A peaceful retreat perfect for spiritual seekers and those looking to explore Tibetan culture.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 12,
    totalRooms: 18,
  },

  // Rajasthan
  {
    _id: '7',
    name: 'Heritage Haveli',
    location: 'Jaipur, Rajasthan',
    price: 200,
    rating: 4.7,
    description: 'Step back in time at our beautifully restored Rajasthani haveli. Experience traditional hospitality with modern comforts, intricate architecture, and authentic cuisine. Located near major historical landmarks.',
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
    _id: '8',
    name: 'Lakefront Luxury Suites',
    location: 'Udaipur, Rajasthan',
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
    _id: '9',
    name: 'Jodhpur Golden Palace',
    location: 'Jodhpur, Rajasthan',
    price: 220,
    rating: 4.6,
    description: 'A magnificent palace hotel offering a glimpse into royal Rajasthan. Features stunning blue city views, traditional folk performances, and exquisite Rajasthani thali dinners.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'restaurant', 'spa', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200'
    ],
    availableRooms: 7,
    totalRooms: 12,
  },

  // Kerala
  {
    _id: '10',
    name: 'Tropical Garden Resort',
    location: 'Kochi, Kerala',
    price: 175,
    rating: 4.6,
    description: 'Immerse yourself in the lush greenery of Kerala. Our eco-friendly resort offers Ayurvedic treatments, backwater cruises, and organic farm-to-table dining experiences. A true wellness retreat.',
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
    _id: '11',
    name: 'Backwater Paradise Resort',
    location: 'Alappuzha, Kerala',
    price: 195,
    rating: 4.8,
    description: 'Experience the magic of Kerala backwaters from our waterfront resort. Enjoy traditional houseboat cruises, Kathakali performances, and authentic Malayali cuisine.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'spa', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200',
      'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=1200'
    ],
    availableRooms: 8,
    totalRooms: 12,
  },
  {
    _id: '12',
    name: 'Wayanad Forest Lodge',
    location: 'Wayanad, Kerala',
    price: 135,
    rating: 4.5,
    description: 'Eco-friendly retreat in the heart of Wayanad wildlife sanctuary. Perfect for wildlife enthusiasts, with guided jungle safaris and treehouse accommodations available.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf4?w=1200'
    ],
    availableRooms: 14,
    totalRooms: 20,
  },

  // Delhi NCR
  {
    _id: '13',
    name: 'Urban Business Hotel',
    location: 'New Delhi, Delhi',
    price: 120,
    rating: 4.3,
    description: 'Modern business hotel in the heart of Delhi with state-of-the-art conference facilities, high-speed internet, and convenient access to business districts and tourist attractions. Perfect for corporate travelers.',
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
    _id: '14',
    name: 'Aerocity Luxury Stay',
    location: 'Aerocity, Delhi',
    price: 185,
    rating: 4.5,
    description: 'Premium hotel near Delhi international airport with 24-hour check-in, spa services, and gourmet dining. Ideal for transit travelers and business executives.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'gym', 'spa', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200'
    ],
    availableRooms: 11,
    totalRooms: 18,
  },
  {
    _id: '15',
    name: 'Gurgaon Executive Inn',
    location: 'Gurgaon, Haryana',
    price: 90,
    rating: 4.1,
    description: 'Affordable luxury in the corporate hub of Gurgaon. Perfect for business travelers with easy access to Cyber Hub, Ambience Mall, and major IT parks.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'gym', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200'
    ],
    availableRooms: 20,
    totalRooms: 30,
  },

  // Karnataka
  {
    _id: '16',
    name: 'Bangalore Tech Park Hotel',
    location: 'Bangalore, Karnataka',
    price: 95,
    rating: 4.2,
    description: 'Clean, comfortable, and affordable accommodation perfect for IT professionals. Located near major tech parks and shopping districts with easy access to public transportation.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'laundry', 'gym'],
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200'
    ],
    availableRooms: 22,
    totalRooms: 35,
  },
  {
    _id: '17',
    name: 'Mysore Palace View Hotel',
    location: 'Mysore, Karnataka',
    price: 130,
    rating: 4.6,
    description: 'Heritage property with stunning views of Mysore Palace. Experience royal Karnataka hospitality with traditional breakfast, guided palace tours, and silk shopping assistance.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 9,
    totalRooms: 14,
  },
  {
    _id: '18',
    name: 'Coorg Coffee Estate Stay',
    location: 'Coorg, Karnataka',
    price: 165,
    rating: 4.7,
    description: 'Stay in a working coffee plantation with misty mountain views. Experience traditional Kodava hospitality, plantation walks, and home-cooked local delicacies.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry', 'petFriendly'],
    images: [
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=1200',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200'
    ],
    availableRooms: 6,
    totalRooms: 10,
  },

  // Tamil Nadu
  {
    _id: '19',
    name: 'Chennai Marina Beach Hotel',
    location: 'Chennai, Tamil Nadu',
    price: 140,
    rating: 4.2,
    description: 'Stylish boutique hotel near Marina Beach in the cultural hub of Chennai. Walking distance to museums, temples, and shopping centers. Features contemporary design with South Indian art influences.',
    amenities: ['wifi', 'ac', 'parking', 'gym', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200',
      'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=1200'
    ],
    availableRooms: 9,
    totalRooms: 15,
  },
  {
    _id: '20',
    name: 'Ooty Nilgiri Mountain Resort',
    location: 'Ooty, Tamil Nadu',
    price: 155,
    rating: 4.5,
    description: 'Colonial-era resort in the queen of hill stations. Surrounded by tea gardens with panoramic views of the Nilgiri hills. Perfect for honeymooners and nature lovers.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry', 'spa'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 8,
    totalRooms: 12,
  },
  {
    _id: '21',
    name: 'Kodaikanal Lakeside Retreat',
    location: 'Kodaikanal, Tamil Nadu',
    price: 125,
    rating: 4.4,
    description: 'Peaceful retreat overlooking Kodaikanal lake. Features boat rides, cycling tours, and traditional South Indian cooking classes. Ideal for romantic getaways.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 11,
    totalRooms: 16,
  },

  // Uttarakhand
  {
    _id: '22',
    name: 'Adventure Base Camp',
    location: 'Rishikesh, Uttarakhand',
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
    _id: '23',
    name: 'Nainital Lake View Hotel',
    location: 'Nainital, Uttarakhand',
    price: 145,
    rating: 4.6,
    description: 'Stunning property overlooking Naini Lake in the lake district of India. Features boating arrangements, cable car tickets, and guided nature walks to Tiffin Top.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200'
    ],
    availableRooms: 7,
    totalRooms: 12,
  },
  {
    _id: '24',
    name: 'Jim Corbett Forest Lodge',
    location: 'Jim Corbett, Uttarakhand',
    price: 180,
    rating: 4.7,
    description: 'Wildlife resort inside Jim Corbett National Park. Expert naturalists, jeep safaris, and bird watching tours. Experience the thrill of tiger sightings.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'
    ],
    availableRooms: 6,
    totalRooms: 10,
  },

  // West Bengal
  {
    _id: '25',
    name: 'Kolkata Victoria Memorial Hotel',
    location: 'Kolkata, West Bengal',
    price: 115,
    rating: 4.3,
    description: 'Heritage hotel in the city of joy near Victoria Memorial. Experience colonial architecture, traditional Bengali cuisine, and cultural performances.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'gym', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 14,
    totalRooms: 22,
  },
  {
    _id: '26',
    name: 'Darjeeling Himalayan Resort',
    location: 'Darjeeling, West Bengal',
    price: 160,
    rating: 4.8,
    description: 'Iconic tea estate property with views of Kanchenjunga. Famous for sunrise views from Tiger Hill, tea garden tours, andjoy ride on the UNESCO heritage toy train.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry', 'spa'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf4?w=1200'
    ],
    availableRooms: 8,
    totalRooms: 14,
  },

  // Gujarat
  {
    _id: '27',
    name: 'Ahmedabad Heritage Hotel',
    location: 'Ahmedabad, Gujarat',
    price: 100,
    rating: 4.2,
    description: 'Centrally located hotel near Sabarmati Ashram and Kalupur market. Experience Gujarati hospitality with unlimited thali meals and textile shopping tours.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 16,
    totalRooms: 25,
  },
  {
    _id: '28',
    name: 'Rann of Kutch Camp',
    location: 'Bhuj, Gujarat',
    price: 135,
    rating: 4.5,
    description: 'Luxury tented camp near the Great Rann of Kutch. Experience stargazing, cultural dances, and traditional Kutchi handicraft shopping during the Rann Utsav.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200'
    ],
    availableRooms: 10,
    totalRooms: 15,
  },
  {
    _id: '29',
    name: 'Dwarka Sea View Hotel',
    location: 'Dwarka, Gujarat',
    price: 110,
    rating: 4.3,
    description: 'Beachfront property with views of the Dwarkadhish Temple. Perfect for pilgrimage travelers with temple tour packages and vegetarian Gujarati cuisine.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200'
    ],
    availableRooms: 12,
    totalRooms: 18,
  },

  // Punjab
  {
    _id: '30',
    name: 'Amritsar Golden Temple Hotel',
    location: 'Amritsar, Punjab',
    price: 125,
    rating: 4.4,
    description: 'Hotel near Golden Temple with免费早餐 and temple ceremony timing assistance. Experience Punjab culture with Bhangra performances and Amritsar food tour.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 15,
    totalRooms: 24,
  },
  {
    _id: '31',
    name: 'Chandigarh Rock Garden Hotel',
    location: 'Chandigarh',
    price: 105,
    rating: 4.3,
    description: 'Modern hotel near Rock Garden and Sukhna Lake. Perfect base to explore the planned city with easy access to sector 17 shopping and Elante Mall.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'gym', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200'
    ],
    availableRooms: 18,
    totalRooms: 28,
  },

  // Andhra Pradesh & Telangana
  {
    _id: '32',
    name: 'Hyderabad Charminar Hotel',
    location: 'Hyderabad, Telangana',
    price: 115,
    rating: 4.4,
    description: 'Heritage hotel near Charminar with famous Hyderabadi biryani and Irani chai. Explore the city of pearls with access to Golconda Fort and Hussain Sagar.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 14,
    totalRooms: 20,
  },
  {
    _id: '33',
    name: 'Visakhapatnam Beach Resort',
    location: 'Visakhapatnam, Andhra Pradesh',
    price: 130,
    rating: 4.5,
    description: 'Beachfront resort with views of Bay of Bengal near RK Beach. Perfect for beach lovers with dolphinnose viewing, submarine museum visits, and Araku Valley trips.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200'
    ],
    availableRooms: 10,
    totalRooms: 16,
  },
  {
    _id: '34',
    name: 'Tirupati Balaji Hotel',
    location: 'Tirupati, Andhra Pradesh',
    price: 85,
    rating: 4.1,
    description: 'Devotional hotel near Tirumala temple with free shuttle service. Offers South Indian vegetarian meals and darshan assistance for pilgrims.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 25,
    totalRooms: 40,
  },

  // Odisha
  {
    _id: '35',
    name: 'Puri Beach Resort',
    location: 'Puri, Odisha',
    price: 120,
    rating: 4.4,
    description: 'Beachfront resort with views of the Jagannath Temple. Experience Rath Yatra, sun rises over the Bay of Bengal, and authentic Odia cuisine with fresh seafood.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200'
    ],
    availableRooms: 11,
    totalRooms: 18,
  },
  {
    _id: '36',
    name: 'Konark Sun Temple Hotel',
    location: 'Konark, Odisha',
    price: 95,
    rating: 4.3,
    description: 'Heritage property near UNESCO World Heritage Sun Temple. Offers cycle tours to nearby Chilika Lake and Konark Beach with cultural dance performances.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 9,
    totalRooms: 14,
  },

  // Chhattisgarh
  {
    _id: '37',
    name: 'Bastar Forest Retreat',
    location: 'Jagdalpur, Chhattisgarh',
    price: 85,
    rating: 4.2,
    description: 'Eco-resort near Chitrakoot Falls and Bastar palace. Experience tribal culture, waterfall treks, and traditional Bastar crafts shopping.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf4?w=1200'
    ],
    availableRooms: 12,
    totalRooms: 18,
  },

  // Jharkhand
  {
    _id: '38',
    name: 'Ranchi Waterfall Resort',
    location: 'Ranchi, Jharkhand',
    price: 90,
    rating: 4.1,
    description: 'Hilltop resort with views of Ranchi hills and nearby waterfalls. Perfect monsoon destination with visits to Dassam Falls, Hundru Falls, and Jonha Falls.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200'
    ],
    availableRooms: 14,
    totalRooms: 20,
  },

  // Bihar
  {
    _id: '39',
    name: 'Bodh Gaya Monastery Hotel',
    location: 'Bodh Gaya, Bihar',
    price: 75,
    rating: 4.3,
    description: 'Peaceful retreat near Mahabodhi Temple, a UNESCO site. Perfect for spiritual seekers with meditation courses, temple tours, and Buddhist monastery visits.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 18,
    totalRooms: 28,
  },
  {
    _id: '40',
    name: 'Patna Ganga River Hotel',
    location: 'Patna, Bihar',
    price: 95,
    rating: 4.0,
    description: 'Riverside hotel overlooking the Ganges with modern amenities. Gateway to Takht Sri Patna Sahib and ancient Nalanda university tours.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'gym', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 20,
    totalRooms: 32,
  },

  // Uttar Pradesh
  {
    _id: '41',
    name: 'Varanasi Ghats View Hotel',
    location: 'Varanasi, Uttar Pradesh',
    price: 110,
    rating: 4.6,
    description: 'Boutique hotel overlooking the Ganges with Ganga Aarti views. Experience the spiritual capital with dawn boat rides, temple tours, and evening Aarti ceremonies.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200'
    ],
    availableRooms: 8,
    totalRooms: 14,
  },
  {
    _id: '42',
    name: 'Agra Taj Mahal Hotel',
    location: 'Agra, Uttar Pradesh',
    price: 145,
    rating: 4.7,
    description: 'Luxury hotel with Taj Mahal views from rooftop restaurant. Perfect sunrise viewing point with day trips to Fatehpur Sikri and Agra Fort.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'restaurant', 'roomService', 'laundry', 'spa'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200'
    ],
    availableRooms: 10,
    totalRooms: 16,
  },
  {
    _id: '43',
    name: 'Lucknow Nawabi Hotel',
    location: 'Lucknow, Uttar Pradesh',
    price: 105,
    rating: 4.4,
    description: 'Heritage property in the city of nawabs featuring Awadhi cuisine and architectural tours. Experience the colonial-era charm with modern comforts.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'gym', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 16,
    totalRooms: 24,
  },
  {
    _id: '44',
    name: 'Mathura Vrindavan Temple Hotel',
    location: 'Mathura, Uttar Pradesh',
    price: 80,
    rating: 4.2,
    description: 'Devotional hotel in the birthplace of Lord Krishna. Perfect for religious travelers with temple darshan assistance and Govind Garden visits.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 22,
    totalRooms: 35,
  },

  // Madhya Pradesh
  {
    _id: '45',
    name: 'Kanha National Park Resort',
    location: 'Mandla, Madhya Pradesh',
    price: 175,
    rating: 4.8,
    description: 'Wildlife resort near Kanha Tiger Reserve with expert naturalists. Experience tiger safaris, bamboo forest walks, and tribal village visits.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'
    ],
    availableRooms: 6,
    totalRooms: 10,
  },
  {
    _id: '46',
    name: 'Orchha Palace Hotel',
    location: 'Orchha, Madhya Pradesh',
    price: 135,
    rating: 4.6,
    description: 'Heritage hotel in a UNESCO heritage town with stunning Mughal architecture. Explore Orchha Fort, Chhatris, and Ram Raja Temple with heritage walks.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf4?w=1200'
    ],
    availableRooms: 8,
    totalRooms: 12,
  },
  {
    _id: '47',
    name: 'Bhimbetka Caves Resort',
    location: 'Bhopal, Madhya Pradesh',
    price: 95,
    rating: 4.3,
    description: 'Resort near UNESCO Bhimbetka rock shelters and Upper Lake. Perfect for history enthusiasts with cave tours and Bhopal city sightseeing.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200'
    ],
    availableRooms: 12,
    totalRooms: 18,
  },

  // Sikkim
  {
    _id: '48',
    name: 'Gangtok MG Marg Hotel',
    location: 'Gangtok, Sikkim',
    price: 140,
    rating: 4.5,
    description: 'Modern hotel on MG Marg with shopping and nightlife access. Perfect base for Nathula Pass trips, Tsongmo Lake visits, and monastery tours.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 10,
    totalRooms: 16,
  },
  {
    _id: '49',
    name: 'Pelling Himalayan View Hotel',
    location: 'Pelling, Sikkim',
    price: 155,
    rating: 4.7,
    description: 'Mountain retreat with unobstructed Kanchenjunga views. Trek to Khangchendzonga base camp, visit Sangachoeling Monastery, and Rabdentse ruins.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200'
    ],
    availableRooms: 7,
    totalRooms: 12,
  },

  // Meghalaya
  {
    _id: '50',
    name: 'Shillong Tree Root Resort',
    location: 'Shillong, Meghalaya',
    price: 145,
    rating: 4.6,
    description: 'Eco-resort in the Scotland of East with living root bridges nearby. Experience crystal clear rivers, caves, and waterfalls of Meghalaya.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry', 'petFriendly'],
    images: [
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=1200',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200'
    ],
    availableRooms: 9,
    totalRooms: 14,
  },
  {
    _id: '51',
    name: 'Cherrapunjee Rainforest Lodge',
    location: 'Cherrapunjee, Meghalaya',
    price: 130,
    rating: 4.7,
    description: 'Rainforest lodge in the wettest place on Earth. Experience living root bridges, longest cave trek, and plunge into Nohkalikai Falls.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf4?w=1200'
    ],
    availableRooms: 6,
    totalRooms: 10,
  },

  // Nagaland
  {
    _id: '52',
    name: 'Kohima Hornbill Festival Hotel',
    location: 'Kohima, Nagaland',
    price: 110,
    rating: 4.3,
    description: 'Hotel in the capital with WWII cemetery tours. Experience Hornbill Festival, Naga tribal villages, and Dzukou Valley trekking.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 10,
    totalRooms: 15,
  },

  // Arunachal Pradesh
  {
    _id: '53',
    name: 'Itanagar Heritage Hotel',
    location: 'Itanagar, Arunachal Pradesh',
    price: 125,
    rating: 4.4,
    description: 'Gateway hotel to the land of dawn-lit mountains. Explore Tawang monastery, Ziro music festival, and Namdapha wildlife sanctuary.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 8,
    totalRooms: 12,
  },

  // Tripura
  {
    _id: '54',
    name: 'Agartala Ujjayanta Palace Hotel',
    location: 'Agartala, Tripura',
    price: 85,
    rating: 4.1,
    description: 'Palace hotel in the capital near Ujjayanta Palace and Neermahal. Explore ancient Unakoti sculptures and Chittagong Hill Tracts border area.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 12,
    totalRooms: 18,
  },

  // Mizoram
  {
    _id: '55',
    name: 'Aizawl Blue Mountain View Hotel',
    location: 'Aizawl, Mizoram',
    price: 95,
    rating: 4.2,
    description: 'Hilltop hotel with panoramic views of the surrounding mountains. Experience Mizo culture, Paik Sawyer waterfall, and Champhai valley views.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf4?w=1200'
    ],
    availableRooms: 10,
    totalRooms: 15,
  },

  // Goa (Expanded)
  {
    _id: '56',
    name: 'North Goa Beach Resort',
    location: 'Anjuna, Goa',
    price: 165,
    rating: 4.5,
    description: 'Beachfront resort near Anjuna flea market and flea markets. Famous for full moon parties, water sports, and vibrant nightlife scene.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'restaurant', 'spa', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200'
    ],
    availableRooms: 14,
    totalRooms: 22,
  },
  {
    _id: '57',
    name: 'South Goa Luxury Beach Resort',
    location: 'Colva, Goa',
    price: 210,
    rating: 4.7,
    description: 'Premium all-inclusive resort in peaceful South Goa. Perfect for families with pristine beaches, sunset cruises, and water sports.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'gym', 'spa', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200'
    ],
    availableRooms: 8,
    totalRooms: 12,
  },
  {
    _id: '58',
    name: 'Goa Heritage Portuguese Villa',
    location: 'Fontainhas, Goa',
    price: 180,
    rating: 4.8,
    description: 'Restored Portuguese villa in Latin Quarter with heritage walks. Experience traditional Goan cuisine, Feni tasting, and spice plantation tours.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200',
      'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=1200'
    ],
    availableRooms: 5,
    totalRooms: 8,
  },

  // Union Territories
  {
    _id: '59',
    name: 'Andaman Beach Resort',
    location: 'Port Blair, Andaman & Nicobar',
    price: 195,
    rating: 4.6,
    description: 'Island resort with ferry access to Havelock and Neil islands. Experience cellular jail, Ross Island, and world-class scuba diving at Havelock.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'restaurant', 'spa', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200'
    ],
    availableRooms: 10,
    totalRooms: 16,
  },
  {
    _id: '60',
    name: 'Havelock Island Eco Resort',
    location: 'Havelock Island, Andaman',
    price: 250,
    rating: 4.9,
    description: 'Eco-friendly beachfront resort on the famous Radhanagar Beach. World-renowned for pristine beauty, elephant beach, and premium diving experiences.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry', 'petFriendly'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf4?w=1200'
    ],
    availableRooms: 6,
    totalRooms: 10,
  },
  {
    _id: '61',
    name: 'Lakshadweep Island Resort',
    location: 'Kavaratti, Lakshadweep',
    price: 280,
    rating: 4.8,
    description: 'Exclusive island resort with overwater bungalows and marine sanctuary. Pristine coral reefs, glass bottom boats, and traditional Lakshadweep cuisine.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'restaurant', 'spa', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200'
    ],
    availableRooms: 4,
    totalRooms: 8,
  },
  {
    _id: '62',
    name: 'Srinagar Dal Lake Houseboat',
    location: 'Srinagar, Jammu & Kashmir',
    price: 200,
    rating: 4.9,
    description: 'Luxury houseboat on Dal Lake with Mughal gardens views. Experience Shikara rides, floating market, and Gondola rides to Gulmarg.',
    amenities: ['wifi', 'ac', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'
    ],
    availableRooms: 3,
    totalRooms: 5,
  },
  {
    _id: '63',
    name: 'Gulmarg Ski Resort',
    location: 'Gulmarg, Jammu & Kashmir',
    price: 220,
    rating: 4.7,
    description: 'Ski resort with gondola access to Apharwat Peak. Winter sports paradise with skiing, snowboarding, and heli-skiing experiences.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'spa', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 12,
    totalRooms: 20,
  },
  {
    _id: '64',
    name: 'Pahalgam Valley Resort',
    location: 'Pahalgam, Jammu & Kashmir',
    price: 185,
    rating: 4.6,
    description: 'Mountain resort at betaab valley with Lidder river views. Base camp for Amarnath Yatra with horse riding and trout fishing.',
    amenities: ['wifi', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200'
    ],
    availableRooms: 8,
    totalRooms: 14,
  },
  {
    _id: '65',
    name: 'Leh Ladakh Mountain Hotel',
    location: 'Leh, Ladakh',
    price: 210,
    rating: 4.8,
    description: 'High altitude hotel with monastery tour packages. Visit Pangong Tso, Nubra Valley, Khardung La, and experience magnetic hill.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf4?w=1200'
    ],
    availableRooms: 10,
    totalRooms: 16,
  },
  {
    _id: '66',
    name: 'Puducherry Beach Hotel',
    location: 'Pondicherry, Puducherry',
    price: 130,
    rating: 4.5,
    description: 'French colonial hotel on Promenade Beach with Auroville tours. Experience French cuisine, meditation at Aurobindo Ashram, and Paradip Beach.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'spa', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200'
    ],
    availableRooms: 12,
    totalRooms: 18,
  },
  {
    _id: '67',
    name: 'Chandigarh City Center Hotel',
    location: 'Chandigarh, Chandigarh',
    price: 110,
    rating: 4.3,
    description: 'Modern hotel in the planned city near Rock Garden and Rose Garden. Perfect for exploring Punjab and Haryana with shopping at Sector 17.',
    amenities: ['wifi', 'ac', 'parking', 'restaurant', 'gym', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ],
    availableRooms: 16,
    totalRooms: 25,
  },
  {
    _id: '68',
    name: 'Daman Sea View Resort',
    location: 'Daman, Daman & Diu',
    price: 100,
    rating: 4.2,
    description: 'Beachfront resort in the Portuguese-influenced union territory. Jet skiing, sunset cruises, and visit to medieval churches and forts.',
    amenities: ['wifi', 'ac', 'parking', 'pool', 'restaurant', 'roomService', 'laundry'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200'
    ],
    availableRooms: 14,
    totalRooms: 22,
  },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  
  let filteredHotels = [...sampleHotels];

  const search = searchParams.get('search');
  const location = searchParams.get('location');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minRating = searchParams.get('minRating');

  if (search) {
    filteredHotels = filteredHotels.filter(hotel =>
      hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      hotel.description.toLowerCase().includes(search.toLowerCase()) ||
      hotel.location.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (location) {
    filteredHotels = filteredHotels.filter(hotel =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (minPrice) {
    filteredHotels = filteredHotels.filter(hotel =>
      hotel.price >= parseInt(minPrice)
    );
  }

  if (maxPrice) {
    filteredHotels = filteredHotels.filter(hotel =>
      hotel.price <= parseInt(maxPrice)
    );
  }

  if (minRating) {
    filteredHotels = filteredHotels.filter(hotel =>
      hotel.rating >= parseFloat(minRating)
    );
  }

  return NextResponse.json({
    hotels: filteredHotels,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalHotels: filteredHotels.length,
      hasMore: false,
    },
  });
}
