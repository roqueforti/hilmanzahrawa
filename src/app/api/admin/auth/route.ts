import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'hilman2026';

    if (password === adminPassword) {
      // Return a simple session token
      return NextResponse.json({ 
        success: true, 
        token: Buffer.from(`admin-authenticated-${Date.now()}`).toString('base64') 
      });
    }

    return NextResponse.json(
      { success: false, error: 'Password / PIN admin tidak valid' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}
