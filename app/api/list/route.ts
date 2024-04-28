import prisma from '@/libs/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  try {
    const tweetList = await prisma.tweet.findMany();
    console.log(tweetList);
    if (!tweetList) {
      return NextResponse.json({ status: 500, result: 'fail', message: '서버에 문제가 발생했습니다.' });
    }
    if (tweetList.length === 0) {
      return NextResponse.json({ status: 204, result: 'fail', message: '트윗이 하나도 없습니다.' });
    }
    return NextResponse.json({ status: 200, result: 'success', data: tweetList });
  } catch (error) {
    console.error('Error retrieving tweet list:', error);
    return NextResponse.json({ status: 500, result: 'fail', message: '서버에 문제가 발생했습니다.' });
  }
}
