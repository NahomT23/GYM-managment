import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";



const GetGymName = async () => {

const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("User not authenticated.");
  }

  const user = session?.user;

  if (!user?.email) {
    throw new Error("User email not found.");
  }

  // Check if the user is an admin
  let gym;
  const admin = await prisma.admin.findUnique({
    where: { email: user.email },
  });

  if (admin) {
    gym = await prisma.gym.findUnique({
      where: { adminEmail: user.email },
    });
  } else {
    // If the user is not an admin, check if they are an employee
    const employe = await prisma.employe.findUnique({
      where: { email: user.email },
    });

    if (employe) {
      gym = await prisma.gym.findUnique({
        where: { id: employe.gymId },
      });
    }
  }

  if (!gym) {
    throw new Error("Gym not found for the current user.");
  }

  const gymName = gym.name;

  return (
    <div>
        <h1 className="text-5xl">
            YOUR GYM NAME
        {gymName}
        </h1>
    </div>
  )
}

export default GetGymName
