// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// // Handle POST requests to update a member
// export async function POST(req: Request) {
//   try {
//     const data = await req.json();


//     // Validate incoming data
//     if (!data.id || !data.firstName || !data.lastName) {
//       return NextResponse.json({ error: "Invalid data" }, { status: 400 });
//     }


//     // Update the member in the database
//     const updatedMember = await prisma.member.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         firstName: data.firstName,
//         lastName: data.lastName,
//         age: data.age,
//         email: data.email,
//         phoneNo: data.phoneNo,
//         emergencyNo: data.emergencyNo,
//         emergencyNoName: data.emergencyNoName,
//         gymId: data.gymId,
//         sex: data.sex,
//         package: data.package,
//         duration: data.duration,
//       },
//     });

//     // Return the updated member
//     return NextResponse.json(updatedMember);
//   } catch (error) {
//     console.error("Error updating member:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }

// }

// // Handler for deleting a member
// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     // Delete the member with the given id from the database
//     const deletedMember = await prisma.member.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: "Member deleted successfully", deletedMember }, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting member:", error);
//     return NextResponse.json({ error: "Error deleting member" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Handle POST requests to update a member
export async function POST(req: Request) {
  // Extract dynamic data outside the try-catch block
  const data = await req.json();

  // Validate incoming data
  if (!data.id || !data.firstName || !data.lastName) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    // Update the member in the database
    const updatedMember = await prisma.member.update({
      where: { id: data.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        email: data.email,
        phoneNo: data.phoneNo,
        emergencyNo: data.emergencyNo,
        emergencyNoName: data.emergencyNoName,
        gymId: data.gymId,
        sex: data.sex,
        package: data.package,
        duration: data.duration,
      },
    });

    // Return the updated member
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Handler for deleting a member
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Extract dynamic data (id) outside the try-catch block
  const { id } = params;

  try {
    // Delete the member with the given id from the database
    const deletedMember = await prisma.member.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Member deleted successfully", deletedMember }, { status: 200 });
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json({ error: "Error deleting member" }, { status: 500 });
  }
}
