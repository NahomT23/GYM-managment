export const dynamic = 'force-dynamic';


import prisma from "@/lib/prisma";
import EmployeDashboardClient from "./EmployeDashboardClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const EmployeDashboardServer = async () => {
  // Get session information
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/');
  }

  const user = session?.user;

  if (!user?.email) {
    throw new Error("User email not found.");
  }

  // Check if the user is an employee or admin
  const employe = await prisma.employe.findUnique({
    where: { email: user.email },
    select: { gymId: true }, // Only fetch the gymId
  });

  const admin = await prisma.admin.findUnique({
    where: { email: user.email },
    select: { gym: { select: { id: true } } }, // Fetch the gymId associated with the admin
  });

  let gymId = null;

  if (employe) {
    // If the user is an employee
    gymId = employe.gymId;
  } else if (admin) {
    // If the user is an admin
    gymId = admin.gym?.id;
  }

  if (!gymId) {
    redirect('/');
  }

  // Fetch members associated with the determined gymId
  const members = await prisma.member.findMany({
    where: {
      gymId: gymId,
    },
  });

  return (
    <div>
      <EmployeDashboardClient members={members} />
    </div>
  );
};

export default EmployeDashboardServer;
