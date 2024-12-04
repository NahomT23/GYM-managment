import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import MemberEditor from "./MemberEditor";
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MemberPageServer = async ({ params }: { params: { id: string } }) => {
  // Fetch the member based on the id from the database
  const member = await prisma.member.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!member) {
    notFound();
  }

  const session = await auth.api.getSession({ headers: await headers() });

  const user = session?.user;

  if (!user?.email) {
    throw new Error("User email not found.");
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email: user.email, // Match the email from the session
    },
  });

  const isAdmin = !!admin; // If admin is found, isAdmin will be true, otherwise false

  return (
    <div className="bg-gray-50">
      <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
        {member.firstName} {member.lastName}
      </h1>
      <MemberEditor member={member} isAdmin={isAdmin} />
      <div className="flex items-center justify-center mb-10">
        <Link href={isAdmin ? "/adminDashboard" : "/employeDashboard"}>
          <Button className="bg-blue-800 mb-10">
            {isAdmin ? "Go to Admin Dashboard" : "Go to Employee Dashboard"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MemberPageServer;
