'use server';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { SessionOptions, getIronSession } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
// import { useRouter } from 'next/router';

export type UserData = {
  username: string;
  email: string;
  password: string;
  nickname?: string;
  avatar?: string;
};

export interface SessionData {
  username?: String;
  email?: String;
  nickname?: String;
  password?: String;
  avatar?: String;
  isSignedIn: boolean;
}

const prisma = new PrismaClient();

const sessionOptions: SessionOptions = {
  cookieName: 'grad-session',
  password: process.env.SESSION_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession() {
  try {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    return session;
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
}

export async function checkUserSignIn() {
  try {
    const session = await getSession();
    if (!session) {
      return { isSignedIn: false, code: 401, result: 'fail', message: '로그인이 필요합니다.' };
    }
    return { ...session, isSignedIn: !!session.email };
  } catch (error) {
    console.error('Error checking user sign-in:', error);
    return { isSignedIn: false, code: 500, result: 'fail', message: '서버에 문제가 발생했습니다.' };
  }
}

export async function findUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (error) {
    console.error('Error finding username:', error);
    return null;
  }
}

export async function findEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error('Error finding email:', error);
    return null;
  }
}

export async function checkUsernameExists(username: string) {
  try {
    const user = await findUsername(username);
    return user !== null;
  } catch (error) {
    console.error('Error checking username exists:', error);
    return false;
  }
}

export async function checkEmailExists(email: string) {
  try {
    const user = await findEmail(email);
    return user !== null;
  } catch (error) {
    console.error('Error checking email exists:', error);
    return false;
  }
}

export async function createUser(data: UserData) {
  try {
    const user = await prisma.user.create({
      data,
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ result: 'fail', message: '아이디와 비밀번호를 입력해주세요.' });
    }
    const user = await findUsername(username);

    if (!user) {
      return res.status(404).json({ result: 'fail', message: '아이디를 찾을 수 없습니다.' });
    }

    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) {
      return res.status(401).json({ result: 'fail', message: '비밀번호가 일치하지 않습니다.' });
    }

    // TODO: bcrypt 대신 강력한 보안을 제공하는 argon2을 사용함
    const session = await getSession();

    if (session) {
      session.username = user.username;
      session.email = user.email;
      session.nickname = user.nickname ?? '';
      session.password = user.password ?? '';
      session.avatar = user.avatar ?? '';

      await session.save();

      return res.status(200).json({ result: 'success', message: `${session.username}님으로 로그인 하였습니다` });
    } else {
      return res.status(500).json({ result: 'fail', message: '세션을 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ result: 'fail', message: '서버에 문제가 발생했습니다.' });
  }
}

export async function logout(req: NextApiRequest | null, res: NextApiResponse) {
  try {
    if (!req) {
      return res.status(400).json({ result: 'fail', message: '잘못된 요청입니다.' });
    }
    const session = await getSession();
    if (session) {
      session.destroy();
    }
    res.redirect('/log-in');
    return res.status(200).json({ result: 'success', message: '로그아웃 되었습니다' });
  } catch (error) {
    console.error('Error logging out:', error);
    return res.status(500).json({ result: 'fail', message: '서버에 문제가 발생했습니다.' });
  }
}

export async function getTweetList(req: NextApiRequest, res: NextApiResponse) {
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
