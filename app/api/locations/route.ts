import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Location from '@/models/Location';

export async function GET() {
  try {
    await connectDB();
    const locations = await Location.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: locations });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const location = await Location.create(body);
    return NextResponse.json({ success: true, data: location }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
