export async function DELETE(req, { params }) {
  if (!global.bookings) global.bookings = [];
  
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'No token provided' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const bookingIndex = global.bookings.findIndex(b => b._id === params.id && b.userId === token);
    
    if (bookingIndex === -1) {
      return new Response(
        JSON.stringify({ message: 'Booking not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    global.bookings[bookingIndex].status = 'cancelled';

    return new Response(
      JSON.stringify({ message: 'Booking cancelled successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return new Response(
      JSON.stringify({ message: 'Error cancelling booking', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
