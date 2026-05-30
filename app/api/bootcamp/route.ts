import { NextRequest, NextResponse } from 'next/server';
import { bootcampEcosystem } from '@/lib/bootcamp';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json(bootcampEcosystem.getEcosystemState());
}

export async function POST(req: NextRequest) {
  try {
    const { studentId, eventType } = await req.json();

    if (!studentId || !eventType) {
      return NextResponse.json({ error: "studentId and eventType are required" }, { status: 400 });
    }

    const composition = await bootcampEcosystem.handleTriggerEvent(studentId, eventType);
    
    return NextResponse.json({
      success: true,
      composition,
      updatedState: bootcampEcosystem.getEcosystemState()
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
