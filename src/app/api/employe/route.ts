// // app/api/employe/route.ts

// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   const body = await req.json();

//   const { id, firstName, lastName, phoneNo } = body;

//   try {
//     const updatedEmployee = await prisma.employe.update({
//       where: { id },
//       data: {
//         firstName,
//         lastName,
//         phoneNo,
//       },
//     });

//     return new Response(JSON.stringify(updatedEmployee), { status: 200 });
//   } catch (error) {
//     console.error("Error updating employee:", error);
//     return new Response(
//       JSON.stringify({ error: "Error updating employee." }),
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req: Request) {
//   const { pathname } = new URL(req.url);
//   const id = pathname.split("/").pop();  // Extract the id from the URL

//   if (!id) {
//     return new Response(JSON.stringify({ error: "Employee ID is required" }), {
//       status: 400,
//     });
//   }

//   try {
//     // Delete the employee from the database
//     await prisma.employe.delete({
//       where: {
//         id,
//       },
//     });

//     return new Response(JSON.stringify({ message: "Employee deleted successfully" }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error deleting employee:", error);
//     return new Response(
//       JSON.stringify({ error: "Error deleting employee." }),
//       { status: 500 }
//     );
//   }
// }


// app/api/employe/route.ts

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  // Extract dynamic data outside the try-catch block
  const body = await req.json();
  const { id, firstName, lastName, phoneNo } = body;

  // Validation for required fields
  if (!id || !firstName || !lastName || !phoneNo) {
    return new Response(
      JSON.stringify({ error: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    // Update the employee in the database
    const updatedEmployee = await prisma.employe.update({
      where: { id },
      data: {
        firstName,
        lastName,
        phoneNo,
      },
    });

    return new Response(JSON.stringify(updatedEmployee), { status: 200 });
  } catch (error) {
    console.error("Error updating employee:", error);
    return new Response(
      JSON.stringify({ error: "Error updating employee." }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  // Extract dynamic data (id) outside the try-catch block
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();  // Extract the id from the URL

  // Validate if the id is present
  if (!id) {
    return new Response(
      JSON.stringify({ error: "Employee ID is required" }),
      { status: 400 }
    );
  }

  try {
    // Delete the employee from the database
    await prisma.employe.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ message: "Employee deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting employee:", error);
    return new Response(
      JSON.stringify({ error: "Error deleting employee." }),
      { status: 500 }
    );
  }
}
