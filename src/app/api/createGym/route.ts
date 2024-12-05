import { NextResponse } from 'next/server';
import  prisma from '@/lib/prisma';  // Assuming you're using Prisma
import { auth } from '@/lib/auth';  // Assuming this is your auth library

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    // Ensure the user is authenticated
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
      return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
    }

    const user = session?.user;
    if (!user?.email) {
      return NextResponse.json({ success: false, message: "User email not found" }, { status: 400 });
    }

    // Check if the user is an admin
    const admin = await prisma.admin.findUnique({
      where: {
        email: user.email,  // Match the email from the session
      },
    });

    if (!admin) {
      return NextResponse.json({ success: false, message: "No Admin is logged in" }, { status: 403 });
    }

    // Create a new gym
    const newGym = await prisma.gym.create({
      data: {
        name: name,
        adminEmail: email,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Gym created successfully",
      gym: newGym,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error creating gym", error: error }, { status: 500 });
  }
}
