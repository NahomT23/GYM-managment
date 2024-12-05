// import prisma from "@/lib/prisma"; // Import Prisma client
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const { email } = await request.json();

//   if (!email) {
//     return NextResponse.json({ error: "Email is required" }, { status: 400 });
//   }

//   try {
//     // Check if the email exists in the admin table
//     const admin = await prisma.admin.findUnique({
//       where: { email },
//     });

//     if (admin) {
//       return NextResponse.json({ exists: true }, { status: 200 });
//     } else {
//       return NextResponse.json({ error: "Admin not found" }, { status: 404 });
//     }
//   } catch (error) {
//     console.error("Error checking admin:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
