export async function GET(req) {
  if (!global.bookings) global.bookings = [];
  
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'No token provided' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userBookings = global.bookings.filter(b => b.userId === token);
    
    return new Response(
      JSON.stringify({ bookings: userBookings }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching bookings', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req) {
  if (!global.bookings) global.bookings = [];
  
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'No token provided' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const bookingData = await req.json();
    
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * (bookingData.price || 100);

    const booking = {
      _id: Date.now().toString(),
      userId: token,
      hotelId: bookingData.hotelId,
      hotelName: bookingData.hotelName || 'Hotel',
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    global.bookings.push(booking);

    return new Response(
      JSON.stringify({ 
        message: 'Booking created successfully', 
        booking,
        totalPrice 
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(
      JSON.stringify({ message: 'Error creating booking', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
