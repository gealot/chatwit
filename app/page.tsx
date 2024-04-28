'use client';

import { useEffect, useState } from 'react';

const HomePage = () => {
  /*
@TODO: 홈화면에 트윗 목록을 보여주기 위한 로직을 작성합니다.
@EXAMPLE:
const tweetList = await prisma.tweet.findMany();
*/
  const [tweetList, setTweetList] = useState([]);
  const handleList = async () => {
    try {
      const response = await fetch('/api/list');
      if (response.ok) {
        const data = await response.json();
        if (data.data.length === 0) {
          return setTweetList(data.message);
        }
        console.log(`[응답상태] ${response.status}`);
        console.log(`[응답결과] ${data.result}`);
        console.log(`[메시지] ${data.message}`);
        console.log(`[데이터] ${data.data}`);
        return setTweetList(data.data);
      } else {
        console.log(`[메시지] API 요청 실패`);
      }
    } catch (error) {
      console.error(`[메시지] API 요청 오류:, ${error}`);
    }
  };
  useEffect(() => {
    handleList();
  }, []);
  return (
    <main className="flex min-h-screen min-w-[60rem] max-w-full flex-col items-center justify-between">
      <span>{tweetList}</span>
      {/* {tweetList.map((tweet, index) => (
        <div key={index}>
          <p>{tweet}</p>
        </div>
      ))} */}
    </main>
  );
};

export default HomePage;
