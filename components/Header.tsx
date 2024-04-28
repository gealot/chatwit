'use client';

import Link from 'next/link';

const Header = () => {
  return (
    <header className="max-w-screen sticky left-0 right-0 top-0 flex min-h-14 w-full max-w-5xl items-center justify-between gap-3 bg-transparent px-6 text-sm shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.1)] backdrop-blur backdrop-saturate-150">
      {/* <div className="mx-auto flex h-full flex-row items-center justify-between gap-3"> */}
      <h1 className="text-2xl font-bold">
        <Link href="/">Chatwit 🦜</Link>
      </h1>
      <nav className="flex gap-5">
        <Link href="/" className="text-default-600">
          Home
        </Link>
        <Link href="/create-account" className="text-default-600">
          Sign In
        </Link>
      </nav>
      {/* </div> */}
    </header>
  );
};

export default Header;
