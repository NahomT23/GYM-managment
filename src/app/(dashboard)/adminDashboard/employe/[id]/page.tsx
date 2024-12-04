import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";  // Make sure this is the correct path to your Prisma client
import { EmployeeEditor } from "../EmployeEditor";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmployeePageServer = async ({ params }: { params: { id: string } }) => {
  const employee = await prisma.employe.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!employee) {
    notFound();
  }

  return (
    <div className="bg-gray-50">
      <h1 className="text-3xl font-bold mb-2 flex items-center justify-center mt-5">
        {employee.firstName} {employee.lastName}
      </h1>
      {/* Pass the employee data to the client component */}
      <EmployeeEditor employee={employee} />
      <div className="flex items-center justify-center">
        <Button>
          <Link href='/adminDashboard'>
          Back to Dashboard
          </Link>
          </Button>
      </div>
    </div>
  );
};

export default EmployeePageServer;
