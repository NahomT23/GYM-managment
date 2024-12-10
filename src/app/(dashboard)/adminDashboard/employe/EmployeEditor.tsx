"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; 
import { format } from "date-fns"; 
import Link from "next/link";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNo: string | null;
  createdAt: Date; 
};

const EmployeeEditor = ({ employee }: { employee: Employee }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<Employee>(employee);
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false); 
  const [isSaving, setIsSaving] = useState(false); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (!editedEmployee.firstName || !editedEmployee.lastName) {
      toast({
        title: "Validation Error",
        description: "First name and last name are required.",
        variant: "destructive",
      });
      return false;
    }

    if (editedEmployee.phoneNo && !/^\d{8}$/.test(editedEmployee.phoneNo)) {
      toast({
        title: "Validation Error",
        description: "Phone number must be 10 digits.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };



  const handleSave = async () => {
    if (isSaving) return; 
    if (!validateFields()) return; 
  
    setIsSaving(true);
    let updatedEmployee;
  
    try {
      const response = await fetch("/api/employe", {
        method: "POST",  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEmployee),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData?.message || "Failed to update employee.");
      }
  
      updatedEmployee = await response.json();
  
    } catch (error: any) {
      console.error("Error updating employee:", error);
      toast({
        title: "Update Failed",
        description: error.message || "There was an issue updating the employee details.",
        variant: "destructive",
      });
    } finally {
      if (updatedEmployee) {
        console.log("Employee updated successfully:", updatedEmployee);
        setEditedEmployee(updatedEmployee);
        setIsEditing(false);
  
        toast({
          title: "Updated Successfully",
          description: "The employee details have been updated.",
        });
      }
  
      setIsSaving(false);
    }
  };
  

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/employe/${employee.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to delete employee.");
      }

      toast({
        title: "Deleted Successfully",
        description: "The employee has been deleted.",
      });


      router.push("/adminDashboard");
    } catch (error: any) {
      console.error("Error deleting employee:", error);
      toast({
        title: "Delete Failed",
        description: error.message || "There was an issue deleting the employee.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <div className="mb-2">
        <strong>First Name:</strong>
        {isEditing ? (
          <input
            type="text"
            name="firstName"
            value={editedEmployee.firstName}
            onChange={handleInputChange}
            className="ml-2 border p-1 rounded w-full"
          />
        ) : (
          <span className="ml-2">{editedEmployee.firstName}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Last Name:</strong>
        {isEditing ? (
          <input
            type="text"
            name="lastName"
            value={editedEmployee.lastName}
            onChange={handleInputChange}
            className="ml-2 border p-1 rounded w-full"
          />
        ) : (
          <span className="ml-2">{editedEmployee.lastName}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Phone Number:</strong>
        {isEditing ? (
          <input
            type="text"
            name="phoneNo"
            value={editedEmployee.phoneNo ?? ""}
            onChange={handleInputChange}
            className="ml-2 border p-1 rounded w-full"
          />
        ) : (
          <span className="ml-2">{editedEmployee.phoneNo}</span>
        )}
      </div>

      <div className="mb-2">
        <strong>Appointed On:</strong>
        <span className="ml-2">{format(new Date(editedEmployee.createdAt), "MMM dd, yyyy")}</span>
      </div>

      <Button onClick={() => setIsEditing(!isEditing)} className="mt-4 bg-blue-500 mr-4">
        {isEditing ? "Cancel" : "Edit"}
      </Button>

      {isEditing && (
        <Button onClick={handleSave} className="mt-4 bg-green-500" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      )}
 
       <Button onClick={handleDelete} className="mt-4 bg-red-500" disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete Employee"}
      </Button>
    </div>
  );
};

export { EmployeeEditor };
