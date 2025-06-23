'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';

import Header from '../layout/Header';

export default function FloatingHeader() {
  const [isShowHeader, setIsShowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // * 스크롤 올릴 경우 헤더 보이기
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 128) {
        setIsShowHeader(false);
      } else if (currentScrollY > lastScrollY) {
        setIsShowHeader(false);
      } else {
        setIsShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        'bg-background sticky top-0 z-[100] transition-transform duration-300 ease-in-out',
        isShowHeader ? 'translate-y-0' : 'translate-y-[-500%]',
        lastScrollY < 128 ? 'hidden' : 'block',
      )}
    >
      <Header />
    </div>
  );
}
