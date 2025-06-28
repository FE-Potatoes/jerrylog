import React from 'react';

import ThemeButton from '@/components/common/ThemeButton';
import { siteConfig } from '@/constants/config';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

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
