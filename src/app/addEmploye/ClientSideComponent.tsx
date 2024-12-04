"use client";

import { Button } from "@/components/ui/button";
import EmployeeSignupForm from "./page";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        {/* First Form (User Signup) */}
        <EmployeeSignupForm />

      </div>

    </div>
  );
}
