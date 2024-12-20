import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Dumbbell } from "lucide-react";
import prisma from "@/lib/prisma";

const Navbar = async () => {
  let gymName = "GymManager";
  let isAdmin = false;

  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (session?.user?.email) {
      const user = session.user;

      // Check if the user is an admin
      const admin = await prisma.admin.findUnique({
        where: { email: user.email },
      });

      if (admin) {
        isAdmin = true;
        const gym = await prisma.gym.findUnique({
          where: { adminEmail: user.email },
        });

        if (gym?.name) {
          gymName = gym.name;
        }
      } else {

        const employe = await prisma.employe.findUnique({
          where: { email: user.email },
        });

        if (employe) {
          const gym = await prisma.gym.findUnique({
            where: { id: employe.gymId },
          });

          if (gym?.name) {
            gymName = gym.name;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error retrieving session or gym data:", error);
 
  }

  return (
    <div>
      <div className="border-b px-4 bg-gray-900 text-white">
        <div className="flex items-center justify-between mx-auto max-w-5xl h-16">
          <Link href={"/"} className="flex gap-2">
            <h2 className="font-bold text-lg">
              {gymName && gymName !== "GymManager" ? `${gymName} GYM` : "GymManager"}
            </h2>
            <Dumbbell />
          </Link>

          <div>
            {gymName !== "GymManager" ? (
              <div className="flex items-center gap-4">
                <form
                  action={async () => {
                    "use server";
                    await auth.api.signOut({
                      headers: await headers(),
                    });
                    redirect("/");
                  }}
                >
                  <Button variant={"outline"} className="text-black">Sign out</Button>
                </form>
                <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <span className="text-black cursor-pointer bg-white px-2 py-2 rounded-lg">Dashboard</span>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    {isAdmin ? (
      <>
        <DropdownMenuItem asChild>
          <Link href={"/adminDashboard"} className="bg-white text-black py-1 px-2 border-1 border-black">Admin Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/employeDashboard"}>Employe Dashboard</Link>
        </DropdownMenuItem>
      </>
    ) : (
      <DropdownMenuItem asChild>
        <Link href={"/employeDashboard"}>Dashboard</Link>
      </DropdownMenuItem>
    )}
  </DropdownMenuContent>
</DropdownMenu>

              </div>
            ) : (
              <Link href={"/sign-up"}>
                <Button variant={"outline"} className="text-black">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
