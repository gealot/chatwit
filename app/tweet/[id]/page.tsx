'use client';
import { Avatar, AvatarIcon, Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { useState } from 'react';

const TweetPage = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const [isLiked, setIsLiked] = useState(false);
  const tempdata = {
    id: '1',
    name: 'John Doe',
    username: '@johndoe',
    avatar: 'https://mystickermania.com/cdn/stickers/adventure-time/adventure-time-bmo-skating-512x512.png',
    content: 'Front-end and UI/UX enthusiast. I love coding and design.',
    likes: 137,
    following: 4,
    followers: 97100,
  };
  return (
    <main className="flex min-h-screen min-w-[60rem] max-w-full flex-col items-center justify-between">
      {/* <div className="flex w-full max-w-5xl items-center justify-between text-sm">{params.id} 트윗 화면</div> */}
      <Card className="max-w-[30rem]">
        <CardHeader className="justify-between">
          <div className="flex items-center gap-5">
            <Avatar
              isBordered
              color="primary"
              radius="full"
              src={tempdata.avatar ?? <AvatarIcon />}
              className="h-12 min-h-12 rounded-full px-1"
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <h4 className="text-small text-default-600 font-semibold leading-none">{tempdata.name}</h4>
              <h5 className="text-small text-default-400 tracking-tight">{tempdata.username}</h5>
            </div>
          </div>
          <Button
            className={isLiked ? 'text-foreground border-default-200 bg-transparent' : ''}
            color="primary"
            radius="full"
            size="sm"
            variant={isLiked ? 'bordered' : 'solid'}
            onPress={() => setIsLiked(!isLiked)}
          >
            {isLiked ? '♡' : '♥'}
          </Button>
        </CardHeader>
        <CardBody className="text-small text-default-400 px-3 py-0">
          <p>Frontend developer and UI/UX enthusiast. Join me on this coding adventure! 💻</p>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="text-default-400 text-small font-semibold">4</p>
            <p className=" text-default-400 text-small">Following</p>
          </div>
          <div className="flex gap-1">
            <p className="text-default-400 text-small font-semibold">97.1K</p>
            <p className="text-default-400 text-small">Followers</p>
          </div>
          <div className="flex gap-1">
            <p className="text-default-400 text-small font-semibold">{tempdata.likes}</p>
            <p className=" text-default-400 text-small">Likes</p>
          </div>
        </CardFooter>
      </Card>
      {/* 트윗 리스트 구성 */}
    </main>
  );
};

export default TweetPage;
