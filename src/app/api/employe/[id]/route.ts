import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";  

export async function DELETE(req: Request, { params }: { params: { id: string } }) {

  try {
    const deletedEmployee = await prisma.employe.delete({
      where: {
        id: params.id, 
      },
    });

    return NextResponse.json(deletedEmployee, { status: 200 });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}


