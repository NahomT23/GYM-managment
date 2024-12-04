

"use client"; // Mark this as a client-side component

import { useState } from "react";
import ToggleActiveButton from "@/components/ToggleActiveButton";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Member = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNo: string;
  emergencyNo: string;
  emergencyNoName: string;
  sex: string;
  package: string;
  duration: string;
  createdAt: Date;
  active: boolean;
};

type EmployeDashboardClientProps = {
  members: Member[];
};

const EmployeDashboardClient = ({ members }: EmployeDashboardClientProps) => {

  // State for search query and sorting options
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"package" | "duration" | "active" | "name">("name");

  // Filter members by search query (name)
  const filteredMembers = members.filter((member) =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort members based on the selected option
  const sortedMembers = filteredMembers.sort((a, b) => {
    if (sortOption === "name") {
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    }
    if (sortOption === "package") {
      return a.package.localeCompare(b.package);
    }
    if (sortOption === "duration") {
      return a.duration.localeCompare(b.duration);
    }
    if (sortOption === "active") {
      return (a.active === b.active ? 0 : a.active ? -1 : 1);
    }
    return 0;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Member List</h1>

      {/* Search and Sort Section */}
      <div className="flex flex-wrap justify-between mb-6 gap-4">
        {/* Add Member Button */}
        <div className="flex flex-1 justify-start">
          <Link href="/addMember">
            <Button
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none transition-all"
            >
              Add New Member
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1">
          <input
            type="text"
            placeholder="Search by name..."
            className="max-w-sm rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort Buttons */}
        <div className="flex space-x-4 items-center">
          <Button
            onClick={() => setSortOption("package")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-all"
          >
            Sort by Package
          </Button>
          <Button
            onClick={() => setSortOption("duration")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-all"
          >
            Sort by Duration
          </Button>
          <Button
            onClick={() => setSortOption("active")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-all"
          >
            Sort by Active
          </Button>
        </div>
      </div>

      {/* Member Table */}
      <Table className="shadow-lg rounded-lg bg-white">
        <TableCaption>A list of all members</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Emergency Number</TableHead>
            <TableHead>Emergency Contact Name</TableHead>
            <TableHead>Package Type</TableHead>
            <TableHead>Package Duration</TableHead>
            <TableHead>Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <Link href={`/adminDashboard/member/${member.id}`}>
                  {member.firstName} {member.lastName}
                </Link>
              </TableCell>
              <TableCell>{member.age}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phoneNo}</TableCell>
              <TableCell>{member.emergencyNo}</TableCell>
              <TableCell>{member.emergencyNoName}</TableCell>
              <TableCell>{member.package}</TableCell>
              <TableCell>{member.duration}</TableCell>
              <TableCell>
                <ToggleActiveButton
                  memberId={member.id}
                  initialStatus={member.active}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeDashboardClient;
