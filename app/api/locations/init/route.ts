import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Location from '@/models/Location';
import { initialLocations } from '@/lib/initialLocations';

export async function POST() {
  try {
    await connectDB();
    
    // Check if locations already exist
    const count = await Location.countDocuments();
    
    if (count > 0) {
      return NextResponse.json({
        success: true,
        message: 'Locations already initialized',
        count
      });
    }
    
    // Insert initial locations
    const locations = await Location.insertMany(initialLocations);
    
    return NextResponse.json({
      success: true,
      message: 'Locations initialized successfully',
      count: locations.length,
      data: locations
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
