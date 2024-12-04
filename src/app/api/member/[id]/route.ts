import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handle PUT and DELETE requests for members
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { active } = await req.json(); // Extract the active field from the request body

    // Update the member's active status in the database
    const updatedMember = await prisma.member.update({
      where: { id: id }, // Use the id from the URL params
      data: { active },   // Update the active field in the database
    });

    // Respond with the updated member data
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error('Error updating member status:', error);
    return NextResponse.json({ error: 'Failed to update member status' }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const member = await prisma.member.findUnique({
      where: { id: id },
    });

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json({ error: 'Failed to fetch member' }, { status: 500 });
  }
}



// Handle DELETE request for members
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Extract the member ID from the URL params

    // Attempt to delete the member from the database
    const deletedMember = await prisma.member.delete({
      where: { id }, // Ensure the ID is passed correctly to the delete query
    });

    // Respond with the deleted member data (optional, can return success message only)
    return NextResponse.json({
      message: "Member deleted successfully",
      deletedMember,
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting member:", error);

    // If the deletion fails, return a 500 error response
    return NextResponse.json({
      error: "Error deleting member",
      message: error // Include the error message for debugging
    }, { status: 500 });
  }
}
