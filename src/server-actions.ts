// import { headers } from "next/headers";
// import { auth } from "./lib/auth";
// import prisma from "./lib/prisma";

// export async function createEmploye(formData: FormData) {
//   // Extract form data
//   const firstName = formData.get("firstName") as string;
//   const lastName = formData.get("lastName") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const phoneNoString = formData.get("phoneNumber") as string; // phone number as string
//   const adminId = formData.get("adminId") as string; // Admin ID from the form
//   const employeId = formData.get("employeId") as string; 
//   if (!firstName || !lastName || !email || !password || !phoneNoString || !adminId ) {
//     throw new Error("Enter all the required fields");
//   }


    
//   const session = await auth.api.getSession({ headers: await headers() });

//   if (!session) {
//     throw new Error("User not authenticated.");
//   }

//   const user = session?.user;

//   if (!user?.email) {
//     throw new Error("User email not found.");
//   }

//   // Validate phone number
//   if (phoneNoString.length < 10) { // Adjust based on your phone number validation
//     throw new Error("Invalid phone number");
//   }

//   // Check if the provided adminId exists in the database
//   const admin = await prisma.admin.findUnique({
//     where: { id: adminId },
//   });

//   if (!admin) {
//     throw new Error("Invalid Admin ID");
//   }
//   const gym = await prisma.gym.findUnique({
//     where:{
//       adminEmail: user.email
//     },
//     select:{
//       id: true
//     }
//   })

//   if(!gym){
//     throw new Error("could not fund gym id")
//   }

//   const gymId = gym.id

//   // Create a new employee
//   await prisma.employe.create({
//     data: {
//       firstName,
//       lastName,
//       email,
//       password,
//       gymId,
//       phoneNo: phoneNoString, // Store phone number as string
//       createdBy: {
//         connect: { id: adminId }, // Link to the admin who created the employee
//       },
//     },
//   });
// }


