export const dynamic = 'force-dynamic';


import { createMember } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";


const AddMember = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/");
  }

  const user = session?.user;

  if (!user?.email) {
    throw new Error("User email not found.");
  }

  // Check if the user is an employee or an admin
  const employe = await prisma.employe.findUnique({
    where: {
      email: user.email,
    },
    include: {
      gym: true, // Include gym data to validate their association
    },
  });

  const admin = await prisma.admin.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!employe && !admin) {
    redirect("/");
  }

  // Determine the gym data based on the user's role
  let gymData = null;

  if (admin) {
    gymData = await prisma.gym.findUnique({
      where: {
        adminEmail: user.email,
      },
      select: {
        id: true,
        name: true,
      },
    });
  } else if (employe) {
    gymData = employe.gym
      ? {
          id: employe.gym.id,
          name: employe.gym.name,
        }
      : null;
  }

  if (!gymData) {
    throw new Error("No gym found for this user.");
  }

  const { id: gymId, name: gym } = gymData;

  // Determine the dashboard link based on user role
  const dashboardLink = admin ? "/adminDashboard" : "/employeDashboard";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        action={createMember}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Add New Member
        </h1>

        {/* Form Fields */}
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-gray-600 font-medium">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="First Name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-gray-600 font-medium">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Last Name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-gray-600 font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-600 font-medium"
          >
            Phone Number:
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Phone Number"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="emergencyNumber"
            className="block text-gray-600 font-medium"
          >
            Emergency Number:
          </label>
          <input
            type="text"
            name="emergencyNumber"
            id="emergencyNumber"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Emergency Number"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="emergencyNumberName"
            className="block text-gray-600 font-medium"
          >
            Emergency Contact Name:
          </label>
          <input
            type="text"
            name="emergencyNumberName"
            id="emergencyNumberName"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Emergency Contact Name"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="medicalHistory"
            className="block text-gray-600 font-medium"
          >
            Medical History:
          </label>
          <input
            type="text"
            name="medicalHistory"
            id="medicalHistory"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Medical History"
          />

          <input type="hidden" name="gymId" id="gymId" value={gymId} />
        </div>

        <div className="space-y-2">
          <label htmlFor="sex" className="block text-gray-600 font-medium">
            Sex:
          </label>
          <select
            name="sex"
            id="sex"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="membershipPackage"
            className="block text-gray-600 font-medium"
          >
            Package:
          </label>
          <select
            name="membershipPackage"
            id="membershipPackage"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="NORMAL">Normal</option>
            <option value="PLATINUM">Platinum</option>
            <option value="PREMIUM">Premium</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="duration" className="block text-gray-600 font-medium">
            Package Duration:
          </label>
          <select
            name="duration"
            id="duration"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="ONE_MONTH">1 Month</option>
            <option value="THREE_MONTHS">3 Months</option>
            <option value="SIX_MONTHS">6 Months</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="age" className="block text-gray-600 font-medium">
            Age:
          </label>
          <input
            type="text"
            name="age"
            id="age"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Age"
          />
        </div>
        <Link href={dashboardLink}>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Member
        </button>
        </Link>
        <div className="flex items-center justify-center mt-4">
        <Link href={dashboardLink}>
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
      </form>
    </div>
  );
};

export default AddMember;


