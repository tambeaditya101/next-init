import { NextResponse } from 'next/server';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  // Add other properties as needed
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Properly extract params by awaiting them
    const { userId } = await params;
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userIdNumber}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: response.status }
      );
    }

    const user: User = await response.json();
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
