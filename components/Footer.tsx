'use client';

import ModalBox from '@/components/Modal';
import { useState } from 'react';

const Footer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  // const toggleModal = (isOpen: boolean) => setIsOpen((isOpen) => !isOpen);
  return (
    <footer className="flex min-h-14 w-full max-w-5xl items-center justify-between text-sm">
      <p className="text-default-400">© 2024 Chatwit</p>
      <nav className="flex gap-5">
        <span onClick={openModal} className="cursor-pointer">
          개인정보처리방침
        </span>
        <span>이용약관</span>
      </nav>
      {isOpen && <ModalBox title="개인정보처리방침" message="개인정보처리방침 내용" onClose={closeModal} />}
    </footer>
  );
};

export default Footer;
