import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Location from '@/models/Location';

export async function GET() {
  try {
    await connectDB();
    
    const totalLocations = await Location.countDocuments();
    const exploredCount = await Location.countDocuments({ status: 'explored' });
    const plannedCount = await Location.countDocuments({ status: 'planned' });
    const unexploredCount = await Location.countDocuments({ status: 'unexplored' });
    
    // Get highest altitude reached
    const highestLocation = await Location.findOne({ status: 'explored' })
      .sort({ altitude: -1 })
      .limit(1);
    
    // Get unique regions explored
    const exploredLocations = await Location.find({ status: 'explored' });
    const uniqueRegions = new Set(exploredLocations.map(loc => loc.region));
    
    // Calculate total trek distance (if available)
    let totalDistance = 0;
    exploredLocations.forEach(loc => {
      if (loc.trekDistance) {
        const distance = parseFloat(loc.trekDistance.replace(/[^0-9.]/g, ''));
        if (!isNaN(distance)) totalDistance += distance;
      }
    });
    
    // Get locations by year
    const locationsByYear: { [key: number]: number } = {};
    exploredLocations.forEach(loc => {
      if (loc.exploredYear) {
        locationsByYear[loc.exploredYear] = (locationsByYear[loc.exploredYear] || 0) + 1;
      }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        totalLocations,
        exploredCount,
        plannedCount,
        unexploredCount,
        highestAltitude: highestLocation?.altitude || 0,
        highestLocation: highestLocation?.name || 'None',
        regionsExplored: uniqueRegions.size,
        totalTrekDistance: totalDistance,
        locationsByYear
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
