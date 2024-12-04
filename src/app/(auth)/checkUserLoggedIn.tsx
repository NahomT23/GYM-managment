// "use server"
// import { auth } from "@/lib/auth";
// import prisma from "@/lib/prisma";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";

// const checkUserLoggedIn = async () => {

//     const session = await auth.api.getSession({ headers: await headers() });

//     if (!session) {
//       throw new Error("User not authenticated.");
//     }
  
//     const user = session?.user;
  
//     if (!user?.email) {
//       throw new Error("User email not found.");
//     }

//     const admin = await prisma.admin.findUnique({
//         where: {
//             email: user?.email
//         }
//     })

//     const employe = await prisma.employe.findUnique({
//         where: {
//             email: user.email
//         }
//     })

//     if(admin){
//         redirect('/adminDashboard')
//     }else if(employe){
//         redirect('/employeDashboard')
//     }
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default checkUserLoggedIn


"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const checkUserLoggedIn = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { isAuthenticated: false }; // Not logged in
  }

  const user = session?.user;

  if (!user?.email) {
    throw new Error("User email not found.");
  }

  const admin = await prisma.admin.findUnique({
    where: { email: user.email },
  });

  const employee = await prisma.employe.findUnique({
    where: { email: user.email },
  });

  if (admin) {
    redirect("/adminDashboard");
  } else if (employee) {
    redirect("/employeDashboard");
  }

  return { isAuthenticated: true }; // User is logged in
};
