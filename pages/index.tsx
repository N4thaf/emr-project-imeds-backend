// app/api/index/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const responseData = {
    message: 'Welcome to the Patient API',
    status: 'OK',
  };

  return NextResponse.json(responseData);
}
