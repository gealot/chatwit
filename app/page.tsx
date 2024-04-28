const HomePage = async () => {
/*
@TODO: 홈화면에 트윗 목록을 보여주기 위한 로직을 작성합니다.
@EXAMPLE:
const tweetList = await prisma.tweet.findMany();
*/
// const tweetList = await getTweetList();
// console.log(tweetList);
  return (
    <main className="flex min-h-screen min-w-[60rem] max-w-full flex-col items-center justify-between">
      {/* <div className="flex w-full max-w-5xl items-center justify-between text-sm">홈화면</div> */}
      {/* <span>{JSON.stringify(tweetList)}</span> */}
    </main>
  );
};

export default HomePage;
