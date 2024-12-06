"use client";

import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // ShadCN Toast hook
import { useRouter } from "next/navigation"; // To handle routing after deletion

type Member = {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  email: string | null;
  phoneNo: string;
  emergencyNo: string;
  emergencyNoName: string;
  sex: "Male" | "Female";
  package: "NORMAL" | "PREMIUM" | "PLATINUM";
  duration: "ONE_MONTH" | "THREE_MONTHS" | "SIX_MONTHS";
  createdAt: Date; // "Joined On" field
};

type PackageRates = {
  [key in "NORMAL" | "PREMIUM" | "PLATINUM"]: number;
};

const MemberEditor = ({ member, isAdmin }: { member: Member; isAdmin: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState<Member>(member);
  const { toast } = useToast(); // Initialize toast hook
  const router = useRouter(); // To handle routing after deletion

  const packageRates: PackageRates = {
    PLATINUM: 7500,
    PREMIUM: 5000,
    NORMAL: 3000,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/member", {
        method: "POST", // Use PUT if updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedMember),
      });

      if (!response.ok) {
        throw new Error("Failed to update member.");
      }

      const updatedMember = await response.json();
      console.log("Member updated successfully:", updatedMember);

      setEditedMember(updatedMember);
      setIsEditing(false);

      toast({
        title: "Updated Successfully",
        description: "The member details have been updated.",
      });
    } catch (error) {
      if(isDynamicServerError(error)){
        throw error
      }
      console.error("Error updating member:", error);
      toast({
        title: "Update Failed",
        description: "There was an issue updating the member details.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/member/${member.id}`, {
        method: "DELETE", // Use DELETE request
      });

      if (!response.ok) {
        throw new Error("Failed to delete member.");
      }

      toast({
        title: "Deleted Successfully",
        description: "The member has been deleted.",
      });

      router.push("/adminDashboard/members"); // Redirect to the members list page
    } catch (error) {
      if(isDynamicServerError(error)){
        throw error
      }
      console.error("Error deleting member:", error);
      toast({
        title: "Delete Failed",
        description: "There was an issue deleting the member.",
      });
    }
  };

  const monthlyRate = packageRates[editedMember.package];
  let totalPayment = 0;

  switch (editedMember.duration) {
    case "THREE_MONTHS":
      totalPayment = monthlyRate * 3;
      break;
    case "SIX_MONTHS":
      totalPayment = monthlyRate * 6;
      break;
    case "ONE_MONTH":
      totalPayment = monthlyRate * 1;
      break;
    default:
      totalPayment = 0;
  }

  // Calculate the membership expiration date
  const calculateExpirationDate = (createdAt: Date, duration: string) => {
    const startDate = new Date(createdAt);
    let expirationDate = new Date(startDate);

    if (duration === "ONE_MONTH") {
      expirationDate.setMonth(expirationDate.getMonth() + 1);
    } else if (duration === "THREE_MONTHS") {
      expirationDate.setMonth(expirationDate.getMonth() + 3);
    } else if (duration === "SIX_MONTHS") {
      expirationDate.setMonth(expirationDate.getMonth() + 6);
    }

    return expirationDate;
  };

  const expirationDate = calculateExpirationDate(editedMember.createdAt, editedMember.duration);

  // Format the "Joined On" date
  const joinedOnDate = new Date(editedMember.createdAt).toDateString();

  // Check if the current date is past the expiration date
  const isExpired = new Date() > expirationDate;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <div className="mb-2">
        <div className="flex items-center justify-center">
        <Button disabled={isExpired} className=" bg-green-700 mb-3">Active</Button>
        </div>
      <br />
        <strong>First Name:</strong>
        {isEditing ? (
          <input
            type="text"
            name="firstName"
            value={editedMember.firstName}
            onChange={handleInputChange}
            className="ml-2 border p-1 rounded w-full"
          />
        ) : (
          <span className="ml-2">{editedMember.firstName}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Last Name:</strong>
        {isEditing ? (
          <input
            type="text"
            name="lastName"
            value={editedMember.lastName}
            onChange={handleInputChange}
            className="ml-2 border p-1 rounded w-full"
          />
        ) : (
          <span className="ml-2">{editedMember.lastName}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Age:</strong>
        {isEditing ? (
          <input
            type="text"
            name="age"
            value={editedMember.age}
            onChange={handleInputChange}
            className="ml-2 border p-1 rounded w-full"
          />
        ) : (
          <span className="ml-2">{editedMember.age}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Email:</strong>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={editedMember.email || ""}
            onChange={handleInputChange}
            className="ml-2 border p-1 rounded w-full"
          />
        ) : (
          <span className="ml-2">{editedMember.email}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Phone Number:</strong>
        {isEditing ? (
          <input
            type="text"
            name="phoneNo"
            value={editedMember.phoneNo}
            onChange={handleInputChange}
            className="ml-2 border p-1 rounded w-full"
          />
        ) : (
          <span className="ml-2">{editedMember.phoneNo}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Emergency Number:</strong>
        {isEditing ? (
          <input
            type="text"
            name="emergencyNo"
            value={editedMember.emergencyNo}
            onChange={handleInputChange}
            className="ml-2 border p-1 rounded w-full"
          />
        ) : (
          <span className="ml-2">{editedMember.emergencyNo}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Emergency Contact Name:</strong>
        {isEditing ? (
          <input
            type="text"
            name="emergencyNoName"
            value={editedMember.emergencyNoName}
            onChange={handleInputChange}
            className="ml-2 border p-1 rounded w-full"
          />
        ) : (
          <span className="ml-2">{editedMember.emergencyNoName}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Sex:</strong>
        {isEditing ? (
          <select
            name="sex"
            value={editedMember.sex}
            onChange={handleSelectChange}
            className="ml-2 border p-1 rounded w-full"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <span className="ml-2">{editedMember.sex}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Package:</strong>
        {isEditing ? (
          <select
            name="package"
            value={editedMember.package}
            onChange={handleSelectChange}
            className="ml-2 border p-1 rounded w-full"
          >
            <option value="NORMAL">Normal</option>
            <option value="PREMIUM">Premium</option>
            <option value="PLATINUM">Platinum</option>
          </select>
        ) : (
          <span className="ml-2">{editedMember.package}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Duration:</strong>
        {isEditing ? (
          <select
            name="duration"
            value={editedMember.duration}
            onChange={handleSelectChange}
            className="ml-2 border p-1 rounded w-full"
          >
            <option value="ONE_MONTH">1 Month</option>
            <option value="THREE_MONTHS">3 Months</option>
            <option value="SIX_MONTHS">6 Months</option>
          </select>
        ) : (
          <span className="ml-2">{editedMember.duration}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Total Payment:</strong>
        <span className="ml-2">${totalPayment}</span>
      </div>


      <div className="mb-2">
        <strong>Joined On:</strong>
        <span className="ml-2">{joinedOnDate}</span>
      </div>


      <div className="mb-2">
        <strong>Expiration Date:</strong>
        <span className="ml-2">{expirationDate.toDateString()}</span>
      </div>

<div className="flex items-center mt-5 ">
  {isEditing ? (
    <Button onClick={handleSave} className="mr-4">Save Changes</Button>
  ) : (
    <Button onClick={() => setIsEditing(true)} className="mr-4">Edit</Button>
  )}

  {isAdmin && (
    <Button onClick={handleDelete} className="ml-4" variant="destructive">
      Delete
    </Button>
  )}

      </div>
    </div>
  );
};

export default MemberEditor;
