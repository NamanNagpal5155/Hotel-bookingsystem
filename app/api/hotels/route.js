import connectDB from '@/lib/db';
import Hotel from '@/models/Hotel';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;

    const query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const hotels = await Hotel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Hotel.countDocuments(query);

    return NextResponse.json({
      hotels,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalHotels: total,
        hasMore: page * limit < total,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json(
      { message: 'Error fetching hotels', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    
    const hotelData = await req.json();

    const hotel = await Hotel.create(hotelData);

    return NextResponse.json(
      { message: 'Hotel created successfully', hotel },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating hotel:', error);
    return NextResponse.json(
      { message: 'Error creating hotel', error: error.message },
      { status: 500 }
    );
  }
}
