export const dynamic = 'force-dynamic';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ClientSideForm from "./ClientSideComponent";

export default function ForceDynamicPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <ClientSideForm />

        <div className="flex items-center justify-center">
          <Link href="/adminDashboard" className="w-full">
            <Button className="w-full">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
