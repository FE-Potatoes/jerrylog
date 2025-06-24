import React from 'react';

import { siteConfig } from '@/app/config';
import ThemeButton from '@/components/common/ThemeButton';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface LogoLink {
  href: string;
  width?: number;
  height?: number;
  src: string | StaticImageData;
}

const LogoLink = ({ href, width, height, src }: LogoLink) => {
  return (
    <Link href={href}>
      <Image
        width={width}
        height={height}
        src={src}
        alt="greening logo"
        priority
      />
    </Link>
  );
};

const NAV_LINKS = siteConfig.menus;

const Header = React.memo(() => {
  return (
    <header className="flex h-20 w-full items-center justify-between pt-4 pb-8 select-none">
      <nav className="flex gap-4">
        {NAV_LINKS.map((item) => {
          return (
            <Link
              key={item.label}
              href={item.href}
              className="font-caveat text-xl"
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <ThemeButton />
    </header>
  );
});

export default Header;
