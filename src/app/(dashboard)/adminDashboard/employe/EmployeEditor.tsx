// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast"; // ShadCN Toast hook
// import { useRouter } from "next/navigation"; // To redirect after deleting
// import { format } from "date-fns"; // For date formatting
// import Link from "next/link";

// type Employee = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   phoneNo: string | null;
//   createdAt: Date; // Added to hold the appointed date
// };

// const EmployeeEditor = ({ employee }: { employee: Employee }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedEmployee, setEditedEmployee] = useState<Employee>(employee);
//   const { toast } = useToast();
//   const router = useRouter();

//   // Handle input field changes during edit mode
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditedEmployee((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle saving changes
//   const handleSave = async () => {
//     try {
//       const response = await fetch("/api/employe", {
//         method: "POST",  
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editedEmployee),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update employee.");
//       }

//       const updatedEmployee = await response.json();
//       console.log("Employee updated successfully:", updatedEmployee);

//       setEditedEmployee(updatedEmployee);
//       setIsEditing(false);

//       toast({
//         title: "Updated Successfully",
//         description: "The employee details have been updated.",
//       });
//     } catch (error) {
//       console.error("Error updating employee:", error);
//       toast({
//         title: "Update Failed",
//         description: "There was an issue updating the employee details.",
//       });
//     }
//   };

//   // Handle deleting the employee
//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`/api/employe/${employee.id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete employee.");
//       }

//       toast({
//         title: "Deleted Successfully",
//         description: "The employee has been deleted.",
//       });

//       // Redirect to another page (e.g., the list of employees or dashboard)
//       router.push("/adminDashboard/employe"); // Adjust the path accordingly
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//       toast({
//         title: "Delete Failed",
//         description: "There was an issue deleting the employee.",
//       });
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg max-w-lg mx-auto">
//       <div className="mb-2">
//         <strong>First Name:</strong>
//         {isEditing ? (
//           <input
//             type="text"
//             name="firstName"
//             value={editedEmployee.firstName}
//             onChange={handleInputChange}
//             className="ml-2 border p-1 rounded w-full"
//           />
//         ) : (
//           <span className="ml-2">{editedEmployee.firstName}</span>
//         )}
//       </div>

//       <div className="mb-2">
//         <strong>Last Name:</strong>
//         {isEditing ? (
//           <input
//             type="text"
//             name="lastName"
//             value={editedEmployee.lastName}
//             onChange={handleInputChange}
//             className="ml-2 border p-1 rounded w-full"
//           />
//         ) : (
//           <span className="ml-2">{editedEmployee.lastName}</span>
//         )}
//       </div>

//       <div className="mb-2">
//         <strong>Phone Number:</strong>
//         {isEditing ? (
//           // <input
//           //   type="text"
//           //   name="phoneNo"
//           //   value={editedEmployee.phoneNo}
//           //   onChange={handleInputChange}
//           //   className="ml-2 border p-1 rounded w-full"
//           // />
//           <input
//   type="text"
//   name="phoneNo"
//   value={editedEmployee.phoneNo ?? ""} // If `phoneNo` is null, use an empty string
//   onChange={handleInputChange}
//   className="ml-2 border p-1 rounded w-full"
// />

//         ) : (
//           <span className="ml-2">{editedEmployee.phoneNo}</span>
//         )}
//       </div>

//       {/* Display the "Appointed On" date here, formatted */}
//       <div className="mb-2">
//         <strong>Appointed On:</strong>
//         <span className="ml-2">{format(new Date(editedEmployee.createdAt), "MMM dd, yyyy")}</span>
//       </div>

//       {/* Toggle between editing and viewing modes */}
//       <Button onClick={() => setIsEditing(!isEditing)} className="mt-4 bg-blue-500 mr-4">
//         {isEditing ? "Cancel" : "Edit"}
//       </Button>

//       {isEditing && (
//         <Button onClick={handleSave} className="mt-4 bg-green-500">
//           Save Changes
//         </Button>
//       )}

//       {/* Delete Button */}
//       <Button onClick={handleDelete} className="mt-4 bg-red-500">
//         Delete Employee
//       </Button>

//     </div>
//   );
// };

// export { EmployeeEditor };



"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // ShadCN Toast hook
import { useRouter } from "next/navigation"; // To redirect after deleting
import { format } from "date-fns"; // For date formatting
import Link from "next/link";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNo: string | null;
  createdAt: Date; // Added to hold the appointed date
};

const EmployeeEditor = ({ employee }: { employee: Employee }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<Employee>(employee);
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false); // Handle delete loading state
  const [isSaving, setIsSaving] = useState(false); // Handle save loading state

  // Handle input field changes during edit mode
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validate input fields before saving
  const validateFields = () => {
    if (!editedEmployee.firstName || !editedEmployee.lastName) {
      toast({
        title: "Validation Error",
        description: "First name and last name are required.",
        variant: "destructive",
      });
      return false;
    }
    // Optionally add more validation, like phone number format
    if (editedEmployee.phoneNo && !/^\d{10}$/.test(editedEmployee.phoneNo)) {
      toast({
        title: "Validation Error",
        description: "Phone number must be 10 digits.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Handle saving changes
  const handleSave = async () => {
    if (isSaving) return; // Prevent multiple submissions
    if (!validateFields()) return; // Ensure validation passes before saving

    setIsSaving(true);
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

      const updatedEmployee = await response.json();
      console.log("Employee updated successfully:", updatedEmployee);

      setEditedEmployee(updatedEmployee);
      setIsEditing(false);

      toast({
        title: "Updated Successfully",
        description: "The employee details have been updated.",
      });
    } catch (error: any) {
      console.error("Error updating employee:", error);
      toast({
        title: "Update Failed",
        description: error.message || "There was an issue updating the employee details.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // // Handle deleting the employee
  // const handleDelete = async () => {
  //   if (isDeleting) return; // Prevent multiple deletions

  //   setIsDeleting(true);
  //   try {
  //     const response = await fetch(`/api/employe/${employee.id}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData?.message || "Failed to delete employee.");
  //     }

  //     toast({
  //       title: "Deleted Successfully",
  //       description: "The employee has been deleted.",
  //     });

  //     // Redirect to another page (e.g., the list of employees or dashboard)
  //     router.push("/adminDashboard/employe"); // Adjust the path accordingly
  //   } catch (error: any) {
  //     console.error("Error deleting employee:", error);
  //     toast({
  //       title: "Delete Failed",
  //       description: error.message || "There was an issue deleting the employee.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };

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

      {/* Display the "Appointed On" date here, formatted */}
      <div className="mb-2">
        <strong>Appointed On:</strong>
        <span className="ml-2">{format(new Date(editedEmployee.createdAt), "MMM dd, yyyy")}</span>
      </div>

      {/* Toggle between editing and viewing modes */}
      <Button onClick={() => setIsEditing(!isEditing)} className="mt-4 bg-blue-500 mr-4">
        {isEditing ? "Cancel" : "Edit"}
      </Button>

      {isEditing && (
        <Button onClick={handleSave} className="mt-4 bg-green-500" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      )}

      {/* Delete Button */}
      {/* <Button onClick={handleDelete} className="mt-4 bg-red-500" disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete Employee"}
      </Button> */}
    </div>
  );
};

export { EmployeeEditor };
