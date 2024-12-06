"use server";


import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { isNotFoundError } from "next/dist/client/components/not-found";



// export async function createEmploye(formData: FormData) {
//   // Extract form data
//   const firstName = formData.get("firstName") as string;
//   const lastName = formData.get("lastName") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const phoneNoString = formData.get("phoneNumber") as string;
//   // Check for missing required fields and provide detailed error messages
//   if (!firstName) {
//     throw new Error("First Name is required");
//   }

//   if (!lastName) {
//     throw new Error("Last Name is required");
//   }

//   if (!email) {
//     throw new Error("Email is required");
//   }

//   if (!password) {
//     throw new Error("Password is required");
//   }

//   if (!phoneNoString) {
//     throw new Error("Phone Number is required");
//   }


//   const session = await auth.api.getSession({ headers: await headers() });

//   if (!session) {
//     throw new Error("User not authenticated.");
//   }

//   const user = session?.user;

//   if (!user?.email) {
//     throw new Error("User email not found.");
//   }

//   // Check if the user is an admin (use the same logic as in `createMember`)
//   const admin = await prisma.admin.findUnique({
//     where: {
//       email: user.email, // Match the email from the session
//     },
//   });


//   if (!admin) {
//     redirect('/')
//   }

//   const adminId = admin.id;

//   const gymData = await prisma.gym.findUnique({
//     where: {
//       adminEmail: user.email
//     }
//   })


//   if(!gymData){
//     throw new Error("error finding the gymId")
//   }

//   const gymId = gymData.id


//   try {
//     // Create a new employee and associate them with the admin who created them
//     await prisma.employe.create({
//       data: {
//         firstName,
//         lastName,
//         email,
//         password,
//         gym: {
//           connect: {
//             id: gymId
//           }
//       },
//         phoneNo: phoneNoString, // Store phone number as string
//         createdBy: {
//           connect: { id: adminId }, // Automatically associate with the adminId
//         },
//       },
//     });

//     redirect("/adminDashboard")
//     return;

//   } catch (err) {
//     console.log("Error creating employee:", err);
//     throw new Error("Error creating employee.");
//   }
// }


export async function createEmploye(formData: FormData) {
  // Extract form data outside the try-catch block
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phoneNoString = formData.get("phoneNumber") as string;

  // Validate form data outside the try-catch block
  if (!firstName) {
    throw new Error("First Name is required");
  }
  if (!lastName) {
    throw new Error("Last Name is required");
  }
  if (!email) {
    throw new Error("Email is required");
  }
  if (!password) {
    throw new Error("Password is required");
  }
  if (!phoneNoString) {
    throw new Error("Phone Number is required");
  }

  // Retrieve session and validate user outside the try-catch block
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("User not authenticated.");
  }

  const user = session?.user;
  if (!user?.email) {
    throw new Error("User email not found.");
  }

  // Find admin associated with the user
  const admin = await prisma.admin.findUnique({
    where: { email: user.email },
  });

  if (!admin) {
    redirect("/");
  }

  const adminId = admin.id;

  // Find the gym data associated with the admin's email
  const gymData = await prisma.gym.findUnique({
    where: { adminEmail: user.email },
  });

  if (!gymData) {
    throw new Error("Error finding the gymId");
  }

  const gymId = gymData.id;

  try {
    // Create a new employee and associate with the gym and admin
    await prisma.employe.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        gym: {
          connect: {
            id: gymId,
          },
        },
        phoneNo: phoneNoString,
        createdBy: {
          connect: { id: adminId },
        },
      },
    });

    redirect("/adminDashboard");
  } catch (error) {
    if(isDynamicServerError(error)){
      throw error
    }
    console.log("Error creating employee:", error);
    throw new Error("Error creating employee.");
  }
}






// export async function createMember(formData: FormData) {


//   const firstName = formData.get("firstName") as string;
//   const lastName = formData.get("lastName") as string;
//   const email = formData.get("email") as string;
//   const phoneNoString = formData.get("phoneNumber") as string;
//   const emergencyNo = formData.get("emergencyNumber") as string;
//   const emergencyNoName = formData.get("emergencyNumberName") as string;
//   const medical = formData.get("medicalHistory") as string;
//   const age = formData.get("age") as string;
//   const sex = formData.get("sex") as "Male" | "Female";
//   const membershipPackage = formData.get("membershipPackage") as "NORMAL" | "PLATINUM" | "PREMIUM";
//   const duration = formData.get("duration") as "ONE_MONTH" | "THREE_MONTHS" | "SIX_MONTHS";
//   const gymId = formData.get("gymId") as string
  
//   const session = await auth.api.getSession({ headers: await headers() });

//   if (!session) {
//     throw new Error("User not authenticated.");
//   }

//   const user = session?.user;

//   if (!user?.email) {
//     throw new Error("User email not found.");
//   }

//   // Check if the user is an employee
//   const employe = await prisma.employe.findUnique({
//     where: {
//       email: user.email, // Match the email from the session
//     },
//   });

//   if (employe) {
//     const employeId = employe.id;


//     if (!employeId) {
//       throw new Error("Unauthorized: Employee ID required.");
//     }

//   if (
//     !firstName ||
//     !lastName ||
//     !email ||
//     !phoneNoString ||
//     !emergencyNo ||
//     !emergencyNoName ||
//     !medical ||
//     !age ||
//     !sex ||
//     !membershipPackage ||
//     !duration ||
//     !gymId

//   ) {
//     throw new Error("Please fill in all required fields.");
//   }

//     // Create the member using employeId
//     await prisma.member.create({
//       data: {
//         firstName,
//         lastName,
//         email,
//         phoneNo: phoneNoString,
//         emergencyNo,
//         emergencyNoName,
//         medical,
//         age,
//         sex,
//         package: membershipPackage,
//         duration,
//         gym: { connect: { id: gymId }, },
//         createdByEmploye: { connect: { id: employeId } },
//       },

//     });
//     console.log(formData.get("gymId"));
//     redirect("/employeDashboard");
//     return;
//   }

//   // Check if the user is an admin
//   const admin = await prisma.admin.findUnique({
//     where: {
//       email: user.email, // Match the email from the session
//     },
//   });

//   if (admin) {
//     const adminId = admin.id;

//     // Validate the admin ID
//     if (!adminId) {
//       throw new Error("Unauthorized: Admin ID required.");
//     }

//     // Create the member using adminId
//     await prisma.member.create({
//       data: {
//         firstName,
//         lastName,
//         email,
//         phoneNo: phoneNoString,
//         emergencyNo,
//         emergencyNoName,
//         medical,
//         age,
//         sex,
//         package: membershipPackage,
//         duration,
//         gym: {
//           connect: {
//             id: gymId
//           }
//       },
//         createdByAdmin: { connect: { id: adminId } },
        
//       },
//     });
//     redirect("/adminDashboard");
//     return;
//   }

//   // If neither employe nor admin is found
//   throw new Error("Unauthorized: User must be an employee or admin.");
// }



export async function createMember(formData: FormData) {
  // Extract dynamic data from formData
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phoneNoString = formData.get("phoneNumber") as string;
  const emergencyNo = formData.get("emergencyNumber") as string;
  const emergencyNoName = formData.get("emergencyNumberName") as string;
  const medical = formData.get("medicalHistory") as string;
  const age = formData.get("age") as string;
  const sex = formData.get("sex") as "Male" | "Female";
  const membershipPackage = formData.get("membershipPackage") as "NORMAL" | "PLATINUM" | "PREMIUM";
  const duration = formData.get("duration") as "ONE_MONTH" | "THREE_MONTHS" | "SIX_MONTHS";
  const gymId = formData.get("gymId") as string;

  // Validate input fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNoString ||
    !emergencyNo ||
    !emergencyNoName ||
    !medical ||
    !age ||
    !sex ||
    !membershipPackage ||
    !duration ||
    !gymId
  ) {
    throw new Error("Please fill in all required fields.");
  }

  // Fetch session and user data
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("User not authenticated.");
  }

  const user = session.user;
  if (!user?.email) {
    throw new Error("User email not found.");
  }

  // Fetch roles and IDs outside the try-catch
  const employe = await prisma.employe.findUnique({
    where: { email: user.email },
  });

  const admin = await prisma.admin.findUnique({
    where: { email: user.email },
  });

  const employeId = employe?.id;
  const adminId = admin?.id;

  if (!employeId && !adminId) {
    throw new Error("Unauthorized: User must be an employee or admin.");
  }

  // Prepare data for member creation
  const memberData = {
    firstName,
    lastName,
    email,
    phoneNo: phoneNoString,
    emergencyNo,
    emergencyNoName,
    medical,
    age,
    sex,
    package: membershipPackage,
    duration,
    gym: { connect: { id: gymId } },
  };

  try {
    if (employeId) {
      // Create member as an employee
      await prisma.member.create({
        data: {
          ...memberData,
          createdByEmploye: { connect: { id: employeId } },
        },
      });
      redirect("/employeDashboard");
    } else if (adminId) {
      // Create member as an admin
      await prisma.member.create({
        data: {
          ...memberData,
          createdByAdmin: { connect: { id: adminId } },
        },
      });
      redirect("/adminDashboard");
    }
  } catch (error) {
    if(isDynamicServerError(error)){
      throw error;
    }
    console.error("Error creating member:", error);
    throw new Error("Failed to create member.");
  }
}



// export async function createAdminAction(name: string, email: string, password: string) {
//   try {
//     // Create a new admin using Prisma (without hashing the password for simplicity here)
//     const newAdmin = await prisma.admin.create({
//       data: {
//         name,
//         email,
//         password, // Do not store plain passwords in a real-world scenario!
//       },
//     })
    
//     redirect("/gymForm")

//     return { success: true, message: "Admin created successfully", admin: newAdmin }
  
//   } catch (error) {

//     redirect("/gymForm")

//     // return console.error("Error creating admin:", error)
//   }
// }


export async function createAdminAction(name: string, email: string, password: string) {
  // Validate inputs
  if (!name || !email || !password) {
    throw new Error("All fields (name, email, password) are required.");
  }

  // Prepare the data for admin creation
  const adminData = {
    name,
    email,
    password, // Remember to hash this password in real-world applications!
  };

  try {
    // Create a new admin using Prisma
    const newAdmin = await prisma.admin.create({
      data: adminData,
    });

    redirect("/gymForm");

    return {
      success: true,
      message: "Admin created successfully",
      admin: newAdmin,
    };
  } catch (error) {
    console.error("Error creating admin:", error);

    redirect("/gymForm");

    return {
      success: false,
      message: "Error creating admin. Please try again.",
    };
  }
}





// export async function createGymAction(name: string, email: string) {
//   try {
//     // Ensure the user is authenticated
//     const session = await auth.api.getSession({ headers: await headers() });

//     if (!session) {
//       throw new Error("User not authenticated.");
//     }

//     const user = session?.user;

//     if (!user?.email) {
//       throw new Error("User email not found.");
//     }

//     // Check if the user is an admin
//     const admin = await prisma.admin.findUnique({
//       where: {
//         email: user.email, // Match the email from the session
//       },
//     });

//     if (!admin) {
//       throw new Error("No Admin is logged in");
//     }

//     const adminId = admin.id;  // Get the admin's ID

//     // Create a new gym
//     const newGym = await prisma.gym.create({
//       data: {
//         name: name,
//         adminEmail: email,
//       },
//     });


//     redirect("/adminDashboard")
//     return { success: true, message: "Gym created successfully", gym: newGym };
        
//   } catch (error) {
//     redirect("/adminDashboard")
//     // console.error("Error creating gym:", error);
//   }
// }




// export async function createGymAction(name: string, email: string) {

//     // Ensure the user is authenticated
//     const session = await auth.api.getSession({ headers: await headers() });

//     if (!session) {
//       throw new Error("User not authenticated.");
//     }

//     const user = session?.user;

//     if (!user?.email) {
//       throw new Error("User email not found.");
//     }

//     // Check if the user is an admin
//     const admin = await prisma.admin.findUnique({
//       where: {
//         email: user.email, // Match the email from the session
//       },
//     });

//     if (!admin) {
//       throw new Error("No Admin is logged in");
//     }

//     const adminId = admin.id;  // Get the admin's ID

//     // Create a new gym
//     const newGym = await prisma.gym.create({
//       data: {
//         name: name,
//         adminEmail: email,
//       },
//     });

//     return { success: true, message: "Gym created successfully", gym: newGym };
        
// }



// export async function createGymAction(name: string, email: string) {
//   // Ensure all required parameters are provided
//   if (!name || !email) {
//     throw new Error("Gym name and email are required.");
//   }

//   // Get session data
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session) {
//     throw new Error("User not authenticated.");
//   }

//   const user = session?.user;
//   if (!user?.email) {
//     throw new Error("User email not found.");
//   }

//   // Check if the user is an admin
//   const admin = await prisma.admin.findUnique({
//     where: {
//       email: user.email, // Match the email from the session
//     },
//   });

//   if (!admin) {
//     throw new Error("No Admin is logged in.");
//   }

//   const adminId = admin.id; // Get the admin's ID

//   // Prepare gym data
//   const gymData = {
//     name,
//     adminEmail: email,
//   };

//   try {
//     // Create a new gym
//     const newGym = await prisma.gym.create({
//       data: gymData,
//     });

//     redirect("/adminDashboard");
//     return {
//       success: true,
//       message: "Gym created successfully",
//       gym: newGym,
//     };
//   } catch (error) {
//     console.error("Error creating gym:", error);
//     redirect("/adminDashboard");
//     return {
//       success: false,
//       message: "Error creating gym. Please try again.",
//     };
//   }
// }








export async function createGymAction(name: string, email: string) {
  // Ensure all required parameters are provided
  if (!name || !email) {
    throw new Error("Gym name and email are required.");
  }

  // Get session data
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("User not authenticated.");
  }

  const user = session?.user;
  if (!user?.email) {
    throw new Error("User email not found.");
  }

  // Check if the user is an admin
  const admin = await prisma.admin.findUnique({
    where: {
      email: user.email, // Match the email from the session
    },
  });

  if (!admin) {
    throw new Error("No Admin is logged in.");
  }

  const adminId = admin.id; // Get the admin's ID

  // Prepare gym data
  const gymData = {
    name,
    adminEmail: email,
  };

  try {
    // Create a new gym
    const newGym = await prisma.gym.create({
      data: gymData,
    });

    redirect("/adminDashboard");
    return {
      success: true,
      message: "Gym created successfully",
      gym: newGym,
    };
  } catch (error) {
    if (isNotFoundError(error)) {
      throw error
    }

    console.error("Error creating gym:", error);
    redirect("/adminDashboard");
    return {
      success: false,
      message: "Error creating gym. Please try again.",
    };
  }
}


