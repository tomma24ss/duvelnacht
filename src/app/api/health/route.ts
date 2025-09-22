import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check - could include database checks, etc.
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'duvelnacht-web',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };

    return NextResponse.json(healthData, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
      }, 
      { status: 500 }
    );
  }
}
