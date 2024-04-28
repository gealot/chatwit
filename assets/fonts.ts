import localFont from 'next/font/local';

const pretendard = localFont({
  src: './PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const nanumsqneo = localFont({
  src: './NanumSquareNeo-Variable.woff2',
  display: 'swap',
  weight: '400 700',
  variable: '--font-nanumsquare-neo',
});

export { nanumsqneo, pretendard };
