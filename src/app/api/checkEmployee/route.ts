import prisma from "@/lib/prisma"; // Assuming this is where your Prisma client is located
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Check if the email exists in the employe table
    const employe = await prisma.employe.findUnique({
      where: { email },
    });

    if (employe) {
      return NextResponse.json({ exists: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
