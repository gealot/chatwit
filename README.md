# Carrot Market Graduation Project

## Goals

- 1주일동안 아래 졸업작품을 마무리하고 제출합니다.
- 이때까지 배운 것을 토대로, 미니 트위터 클론을 완성합니다.
- NextJS, Prisma, Tailwind, API Routes 그리고 SWR 를 활용하여 아래 페이지를 완성합니다.
- / : 로그인 여부를 확인하여 로그인이 되어있다면 홈페이지를 그렇지 않다면 계정 생성 / 로그인 페이지로 이동하세요.
- /create-account : 계정을 생성하는 페이지입니다.
- /log-in : 로그인을 진행하는 페이지입니다.
- /tweet/[id] : 트윗의 상세 정보를 보는 페이지 입니다.

### Home Page (/)

- After logging in, in the Home Page, the user should see all the Tweets on the database, the user should also be able to POST a Tweet.
- 로그인이 완료되었을 경우, 사용자는 데이터베이스에 존재하는 모든 트윗을 볼 수 있어야 합니다.
- 또한 트윗을 작성할 수 있어야 합니다.

### Tweet Page (/tweet/[id])

- The user should be able to see the tweet + a Like button.
- When the Like button is pressed, save the like on the database and reflect the update using mutate from useSWR.
- 사용자는 id에 해당하는 트윗의 내용과 좋아요 버튼을 볼 수 있어야 합니다.
- 좋아요 버튼을 클릭했을 경우 좋아요의 상태값이 데이터베이스에 저장되어야 하며 useSWR의 mutate를 사용하여 업데이트를 반영해야 합니다.

## 참고사항

- 챌린지 blueprint에는 SQLite을 기반으로 한 Prisma가 설정되어있습니다.
- prisma.schema파일을 변경했다면 npm run db-sync를 실행하세요.
- SWR와 tailwind도 챌린지 blueprint에 설정되어 있습니다.

## 제출방법

- 오늘의 템플릿: 위의 Today's Blueprint 버튼을 클릭하세요!
- Code Sandbox라는 툴을 이용하되. 이번엔 해당 블루프린트를 다운로드 받아서. 로컬 컴퓨터에서 작업하세요.
- Blueprint > File > Export to Zip
- 컴퓨터에서 열고. npm i을 실행하세요.
- 코딩 챌린지를 완료한 후. 본인의 Github에 과제를 업로드하세요.
- 해당 Repository 주소를 제출합니다.
  - github.com/유저명/repository명 으로 된 링크로 제출해 주세요.
  - (예시) <https://github.com/escriboy/nomad-twitter>
  - Repository의 visibility는 반드시 public 상태로 되어 있어야 합니다.
- 제출기간: 다음주 월요일 오전 6시까지
- 10주 스터디 마지막 과제입니다. 10주동안 정말 고생하셨습니다!

## TA's Hint

- Prisma 데이터 모델 작성 시 Relation을 활용하세요.
  - Relation 공식 문서 <https://www.prisma.io/docs/concepts/components/prisma-schema/relations>
- API를 통하여 값을 받아오고 싶을떈 useSWR을 사용합니다.
  - SWR 공식 문서 <https://swr.vercel.app/ko/docs/data-fetching>
- API에 값을 전달하고 싶을땐 fetch API를 사용합니다.
  - fetch API 공식 문서 <https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch>
- 로그인을 완료했을 경우 iron-session을 사용하여 로그인 정보를 저장 할 수 있습니다.
- 페이지를 이동하고 싶을땐 useRouter훅을 사용하여 리다이렉션을 할 수 있습니다.
  - useRouter 공식 문서 <https://nextjs.org/docs/api-reference/next/router>
- react-hook-form의 watch 함수를 사용하여 사용자가 값을 모두 입력하지 않았을 경우 버튼을 비활성화 할 수 있습니다.
  - watch 공식 문서 <https://react-hook-form.com/api/useform/watch>
- try-catch 구문과 setError함수를 사용하면 API에서 오류가 발생했을 경우 원하는 오류 문구를 출력 할 수 있습니다.
  - setError 공식 문서 <https://react-hook-form.com/api/useform/seterror>
- 트윗 상세페이지를 구현할땐 useRouter의 query 객체를 활용합니다.
  - router 객체 공식 문서 <https://nextjs.org/docs/api-reference/next/router#router-object>
- useRef를 활용하면 페이지 로딩이 완료된 후 특정 코드를 실행할 수 있습니다.
  - useRef 공식 문서 <https://ko.reactjs.org/docs/hooks-reference.html#useref>
