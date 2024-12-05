// // app/api/employe/[id]/route.ts

// import prisma from "@/lib/prisma"; // Make sure this is the correct path to your Prisma client
// import { NextResponse } from "next/server";  // Next.js 14 uses `NextResponse` instead of `NextApiResponse`

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {

//   try {
//     // Delete the employee by ID
//     const deletedEmployee = await prisma.employe.delete({
//       where: {
//         id: params.id,  // Get the ID from URL params
//       },
//     });

//     // Return success response
//     return NextResponse.json(deletedEmployee, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting employee:", error);
//     return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
//   }
// }


