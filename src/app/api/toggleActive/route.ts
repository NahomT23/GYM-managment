// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { memberId, active } = req.body;

//     if (!memberId) {
//       return res.status(400).json({ error: 'Member ID is required' });
//     }

//     try {
//       const updatedMember = await prisma.member.update({
//         where: { id: memberId },
//         data: { active },
//       });
//       return res.status(200).json(updatedMember);
//     } catch (error) {
//       return res.status(500).json({ error: 'Failed to update member status' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }


// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { memberId, active } = body;

//     if (!memberId) {
//       return NextResponse.json(
//         { error: 'Member ID is required' },
//         { status: 400 }
//       );
//     }

//     const updatedMember = await prisma.member.update({
//       where: { id: memberId },
//       data: { active },
//     });

//     return NextResponse.json(updatedMember, { status: 200 });
//   } catch (error) {
//     console.error('Error updating member status:', error);
//     return NextResponse.json(
//       { error: 'Failed to update member status' },
//       { status: 500 }
//     );
//   }
// }

// export async function OPTIONS() {
//   return NextResponse.json(
//     { message: 'Method allowed: POST' },
//     { status: 200, headers: { Allow: 'POST' } }
//   );
// }


import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  // Extract dynamic data outside the try-catch block
  const body = await request.json();
  const { memberId, active } = body;

  // Validate the input data
  if (!memberId) {
    return NextResponse.json(
      { error: 'Member ID is required' },
      { status: 400 }
    );
  }

  try {
    // Update the member in the database
    const updatedMember = await prisma.member.update({
      where: { id: memberId },
      data: { active },
    });

    return NextResponse.json(updatedMember, { status: 200 });
  } catch (error) {
    console.error('Error updating member status:', error);
    return NextResponse.json(
      { error: 'Failed to update member status' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    { message: 'Method allowed: POST' },
    { status: 200, headers: { Allow: 'POST' } }
  );
}
