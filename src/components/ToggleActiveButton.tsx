"use client"; // Client-side component

import { useState } from "react";

interface ToggleActiveButtonProps {
  memberId: string;
  initialStatus: boolean;
}

const ToggleActiveButton: React.FC<ToggleActiveButtonProps> = ({ memberId, initialStatus }) => {
  const [isActive, setIsActive] = useState(initialStatus);

  // Handle toggle active status
  const handleToggleActive = async () => {
    try {
      const response = await fetch(`/api/member/${memberId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: !isActive,
        }),
      });

      if (response.ok) {
        const updatedMember = await response.json();
        setIsActive(updatedMember.active); // Update local state with new active status
      } else {
        console.error("Failed to update member status.");
      }
    } catch (error) {
      console.error("Error updating member status:", error);
    }
  };

  return (
    <button
      onClick={handleToggleActive}
      className={`${
        isActive ? "bg-green-500" : "bg-red-500"
      } text-white px-4 py-2 rounded`}
    >
      {isActive ? "ACTIVE" : "Not Active"}
    </button>
  );
};

export default ToggleActiveButton;
