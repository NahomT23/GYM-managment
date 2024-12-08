import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Dumbbell } from "lucide-react";
import prisma from "@/lib/prisma";

const Navbar = async () => {
  let gymName = "GymManager"; // Default name for non-logged-in users
  let isAdmin = false; // Variable to check if the user is an admin

  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (session?.user?.email) {
      const user = session.user;

      // Check if the user is an admin
      const admin = await prisma.admin.findUnique({
        where: { email: user.email },
      });

      if (admin) {
        isAdmin = true; // Mark the user as an admin
        const gym = await prisma.gym.findUnique({
          where: { adminEmail: user.email },
        });

        if (gym?.name) {
          gymName = gym.name;
        }
      } else {
        // If the user is not an admin, check if they are an employee
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
    // Fallback for non-authenticated users or errors
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
                {/* <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline" className="text-black">Dashboard</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {isAdmin ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href={"/adminDashboard"}>Admin Dashboard</Link>
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
                </DropdownMenu> */}
                <DropdownMenu>
  <DropdownMenuTrigger asChild>
    {/* Use a span or div instead of the Button directly */}
    <span className="text-black cursor-pointer">Dashboard</span>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    {isAdmin ? (
      <>
        <DropdownMenuItem asChild>
          <Link href={"/adminDashboard"} className="bg-white text-black py-2 px-2 border-1 border-black">Admin Dashboard</Link>
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
