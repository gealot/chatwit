import prisma from '@/libs/db';
import { NextApiRequest, NextApiResponse } from 'next';

export const dynamic = 'force-dynamic';
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tweetList = await prisma.tweet.findMany();
    if (!tweetList) {
      return res.status(404).json({ result: 'fail', message: '트윗이 하나도 없습니다.' });
    }
    return res.status(200).json({ result: 'success', tweetList });
  } catch (error) {
    console.error('Error retrieving tweet list:', error);
    return res.status(500).json({ result: 'fail', message: '서버에 문제가 발생했습니다.' });
  }
}
