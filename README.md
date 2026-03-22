# Hotel Booking System

A modern, full-stack hotel booking web application built with Next.js 14, MongoDB, and Framer Motion.

## Features

- **User Authentication**: Register, login, and manage user profiles with JWT tokens
- **Hotel Browsing**: Browse hotels with search and filtering capabilities
- **Detailed Hotel Views**: Image galleries, amenities, descriptions, and room availability
- **Booking System**: Select dates, guests, and make reservations
- **User Dashboard**: View and manage bookings, cancel reservations
- **Admin Panel**: Add, edit, and delete hotels; manage bookings

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt password hashing

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hotel-booking-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/hotel-booking
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

4. Seed the database with sample hotels:
```bash
npm run seed
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /api
    /auth
      /register/route.js
      /login/route.js
    /hotels
      /route.js
      /[id]/route.js
    /booking
      /route.js
      /[id]/route.js
  /login/page.js
  /register/page.js
  /hotels/page.js
  /hotels/[id]/page.js
  /dashboard/page.js
  /admin/page.js
  layout.js
  page.js
/components
  Navbar.jsx
  HotelCard.jsx
  Filters.jsx
  BookingForm.jsx
  Loader.jsx
/context
  AuthContext.jsx
/lib
  db.js
  auth.js
/models
  User.js
  Hotel.js
  Booking.js
/scripts
  seed.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Hotels
- `GET /api/hotels` - Get all hotels (with filtering)
- `GET /api/hotels/:id` - Get single hotel
- `POST /api/hotels` - Create hotel (admin)
- `PUT /api/hotels/:id` - Update hotel (admin)
- `DELETE /api/hotels/:id` - Delete hotel (admin)

### Bookings
- `GET /api/booking` - Get user bookings
- `POST /api/booking` - Create booking
- `DELETE /api/booking/:id` - Cancel booking

## Admin Access

To access the admin panel:
1. Register a new account
2. Manually update the user's role to 'admin' in MongoDB:
```javascript
db.users.updateOne({ email: "your-email@example.com" }, { $set: { role: "admin" } })
```

## Features Overview

### Animations (Framer Motion)
- Page transitions
- Hover effects on cards
- Modal animations
- Loading states
- Scroll-triggered animations

### Responsive Design
- Mobile-first approach
- Desktop enhancements
- Touch-friendly interfaces

### Security
- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation

## License

MIT License
