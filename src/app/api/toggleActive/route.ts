import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { memberId, active } = req.body;

    if (!memberId) {
      return res.status(400).json({ error: 'Member ID is required' });
    }

    try {
      const updatedMember = await prisma.member.update({
        where: { id: memberId },
        data: { active },
      });
      return res.status(200).json(updatedMember);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update member status' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
