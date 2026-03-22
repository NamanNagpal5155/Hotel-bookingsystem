import connectDB from '@/lib/db';
import Hotel from '@/models/Hotel';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    await connectDB();
    
    const hotel = await Hotel.findById(params.id);

    if (!hotel) {
      return NextResponse.json(
        { message: 'Hotel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ hotel }, { status: 200 });
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return NextResponse.json(
      { message: 'Error fetching hotel', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    
    const hotelData = await req.json();

    const hotel = await Hotel.findByIdAndUpdate(
      params.id,
      hotelData,
      { new: true, runValidators: true }
    );

    if (!hotel) {
      return NextResponse.json(
        { message: 'Hotel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Hotel updated successfully', hotel },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating hotel:', error);
    return NextResponse.json(
      { message: 'Error updating hotel', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    
    const hotel = await Hotel.findByIdAndDelete(params.id);

    if (!hotel) {
      return NextResponse.json(
        { message: 'Hotel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Hotel deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting hotel:', error);
    return NextResponse.json(
      { message: 'Error deleting hotel', error: error.message },
      { status: 500 }
    );
  }
}
