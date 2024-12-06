
export const dynamic = 'force-dynamic';


import { auth } from "@/lib/auth";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableFooter, 
    TableHead, 
    TableHeader, 
    TableRow    
} from "@/components/ui/table";
import Dashboard from "@/components/DashboardCounter";
import ToggleActiveButton from "@/components/ToggleActiveButton"; 
import AdminDashboardClient from "@/components/AdminDashboardClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const AdminDashboard = async () => {



    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      redirect('/')
    }
  
    const user = session?.user;
  
    if (!user?.email) {
      throw new Error("User email not found.");
    }
  
    // Check if the user is an admin (use the same logic as in `createMember`)
    const admin = await prisma.admin.findUnique({
      where: {
        email: user.email, // Match the email from the session
      },
    });

    if(!admin){
      redirect('/')
    }
  

    const gym = await prisma.gym.findUnique({
      where: {
        adminEmail: user.email
      }, 
      select: {
        id: true
      }
    })

    if(!gym){
      throw new Error('gym id could not be found')
    }

    const gymId = gym.id

  // Retrieve all employees and members from the database
  const employes = await prisma.employe.findMany({
    where: {
      gymId: gymId
    }
  });
  const members = await prisma.member.findMany({
    where: {
      gymId: gymId
    }
  });

  // Define package prices with type for keys being the exact package names
  const packagePrices: { [key in 'platinum' | 'premium' | 'normal']: number } = {
    platinum: 7500,
    premium: 5000,
    normal: 3000,
  };

  // Calculate total revenue and individual member payments
  let totalRevenue = 0;

  // Member List with Payment Calculations
  const membersWithPayment = members.map((member) => {
    const packageKey = member.package.toLowerCase() as 'platinum' | 'premium' | 'normal';  // Cast to valid key
    let monthlyRate = packagePrices[packageKey] || 0;
    let totalPayment = 0;

    switch (member.duration) {
      case 'THREE_MONTHS':
        totalPayment = monthlyRate * 3;
        break;
      case 'SIX_MONTHS':
        totalPayment = monthlyRate * 6;
        break;
      case 'ONE_MONTH':
        totalPayment = monthlyRate * 1;
        break;
      default:
        totalPayment = 0;
    }

    // Add payment to total revenue
    totalRevenue += totalPayment;

    return {
      ...member,
      totalPayment,
    };
  });


    const totalMembers = await prisma.member.count({
      where: {
          gymId: gymId 
      }
  });

  const totalEmployes = await prisma.employe.count({
      where: {
          gymId: gymId
      }
  });

  const activeMembers = await prisma.member.count({
      where: {
          gymId: gymId,
          active: true
      }
  });


  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-950">
      <div className="p-4 grid gap-6">
        <Dashboard
          totalRevenue={totalRevenue}
          totalMembers={totalMembers}
          totalEmployes={totalEmployes}
          activeMembers={activeMembers}
        />
      </div>

      <div className="flex justify-between items-center px-9">
        <h1 className="text-2xl font-bold mb-4">Employee List</h1>
        <Link href="/addEmploye">
          <Button className=" py-2 px-4 rounded shadow">
            Create Employe
          </Button>
        </Link>
      </div>

      {/* Employee Table */}
      <div className="p-6 dark:bg-gray-800 shadow-lg rounded-lg">
        <Table className="px-6 bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 py-2">Name</TableHead>
              <TableHead className="bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 py-2">Email</TableHead>
              <TableHead className="bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 py-2">Phone Number</TableHead>
              <TableHead className="bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 py-2">Appointed On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employes.map((employe) => (
              <TableRow key={employe.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <TableCell className="py-2">
                  <Link href={`/adminDashboard/employe/${employe.id}`}>
                    {employe.firstName} {employe.lastName}
                  </Link>
                </TableCell>
                <TableCell className="py-2">{employe.email}</TableCell>
                <TableCell className="py-2">{employe.phoneNo}</TableCell>
                <TableCell className="py-2">{employe.createdAt.toDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center px-9 pb-5 pt-5">
        <h1 className="text-2xl font-bold mb-4">Member List</h1>
        <Link href="/addMember">
          <Button className=" py-2 px-4 rounded shadow">
            Create Member
          </Button>
        </Link>
      </div>

      <AdminDashboardClient members={members} />
    </div>
  );
};

export default AdminDashboard;


