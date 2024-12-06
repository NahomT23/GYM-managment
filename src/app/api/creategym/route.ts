

// // import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";
// // import { auth } from "@/lib/auth";

// // export async function POST(req: Request) {
// //   try {
// //     const body = await req.json();
// //     const { name, email } = body;

// //     if (!name || !email) {
// //       return NextResponse.json(
// //         { success: false, message: "Name and email are required." },
// //         { status: 400 }
// //       );
// //     }

// //     // Ensure the user is authenticated
// //     const session = await auth.api.getSession({ headers: req.headers });

// //     if (!session) {
// //       return NextResponse.json(
// //         { success: false, message: "User not authenticated." },
// //         { status: 401 }
// //       );
// //     }

// //     const user = session.user;

// //     if (!user?.email) {
// //       return NextResponse.json(
// //         { success: false, message: "User email not found." },
// //         { status: 401 }
// //       );
// //     }

// //     // Check if the user is an admin
// //     const admin = await prisma.admin.findUnique({
// //       where: { email: user.email },
// //     });

// //     if (!admin) {
// //       return NextResponse.json(
// //         { success: false, message: "No Admin is logged in." },
// //         { status: 403 }
// //       );
// //     }

// //     // Create a new gym
// //     const newGym = await prisma.gym.create({
// //       data: { name, adminEmail: email },
// //     });

// //     return NextResponse.json(
// //       { success: true, message: "Gym created successfully.", gym: newGym },
// //       { status: 201 }
// //     );
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json(
// //       { success: false, message: "Error creating gym.", error },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { auth } from "@/lib/auth";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, email } = body;

//     // Validate input
//     if (!name || !email) {
//       return NextResponse.json(
//         { success: false, message: "Name and email are required." },
//         { status: 400 }
//       );
//     }

//     // Ensure the user is authenticated
//     const session = await auth.api.getSession({ headers: req.headers });

//     if (!session) {
//       return NextResponse.json(
//         { success: false, message: "User not authenticated." },
//         { status: 401 }
//       );
//     }

//     const user = session.user;

//     if (!user?.email) {
//       return NextResponse.json(
//         { success: false, message: "User email not found." },
//         { status: 401 }
//       );
//     }

//     // Check if the user is an admin
//     const admin = await prisma.admin.findUnique({
//       where: { email: user.email },
//     });

//     if (!admin) {
//       return NextResponse.json(
//         { success: false, message: "No Admin is logged in." },
//         { status: 403 }
//       );
//     }

//     // Create a new gym
//     const newGym = await prisma.gym.create({
//       data: { name, adminEmail: email },
//     });

//     return NextResponse.json(
//       { success: true, message: "Gym created successfully.", gym: newGym },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: "Error creating gym.", error },
//       { status: 500 }
//     );
//   }
// }
