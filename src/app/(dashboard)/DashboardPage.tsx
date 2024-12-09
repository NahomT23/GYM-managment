// import { auth } from "@/lib/auth";
// import prisma from "@/lib/prisma";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import EmployeDashboardClient from "./employeDashboard/EmployeDashboardClient";


// const page = async () => {
//   const session = await auth.api.getSession({ headers: await headers() });

//   if (!session) {
//     throw new Error("User not authenticated.");
//   }

//   const user = session?.user;

//   if (!user?.email) {
//     throw new Error("User email not found.");
//   }

//   // Fetch the gymId associated with the logged-in employee
//   const employe = await prisma.employe.findUnique({
//     where: {
//       email: user.email,
//     },
//     select: {
//       gymId: true, // Get the gymId of the employee
//       firstName: true,
//       lastName: true,
//       phoneNo: true,
//     },
//   });

//   if (!employe) {
//     redirect("/");
//   }

//   const gymId = employe.gymId;

//   // Fetch members associated with the same gym as the employee
//   const members = await prisma.member.findMany({
//     where: {
//       gymId: gymId, // Filter members by gymId of the logged-in employee
//     },
//   });

//   return (
//     <div className="text-5xl">
//       <h1>DASHBOARD</h1>
//       <ul>
//         <li>Name: {employe.firstName} {employe.lastName}</li>
//         <li>Email: {user.email}</li>
//         <li>Phone: {employe.phoneNo}</li>
//       </ul>
      
//       {/* Pass the filtered members to the client-side component */}
//       <EmployeDashboardClient members={members} />
//     </div>
//   );
// };

// export default page;
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MainDashboardClient from "./MainDashboardClient";

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("User not authenticated.");
  }

  const user = session?.user;

  if (!user?.email) {
    throw new Error("User email not found.");
  }

  // Fetch the gymId associated with the logged-in employee
  const employe = await prisma.employe.findUnique({
    where: {
      email: user.email,
    },
    select: {
      gymId: true, // Get the gymId of the employee
      firstName: true,
      lastName: true,
      phoneNo: true,
    },
  });

  if (!employe) {
    redirect("/");
  }

  const gymId = employe.gymId;

  // Fetch members associated with the same gym as the employee
  const members = await prisma.member.findMany({
    where: {
      gymId: gymId, // Filter members by gymId of the logged-in employee
    },
  });

  return (
    <div className="text-5xl">
      <h1>DASHBOARD</h1>
      <ul>
        <li>
          Name: {employe.firstName} {employe.lastName}
        </li>
        <li>Email: {user.email}</li>
        <li>Phone: {employe.phoneNo}</li>
      </ul>

      {/* Pass the filtered members to the client-side component */}
      <MainDashboardClient members={members} />
    </div>
  );
};

export default page;

