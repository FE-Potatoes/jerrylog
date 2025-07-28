'use client';

import { siteConfig } from '@/shared/constants/config';
import { cn } from '@/shared/lib/utils/cn';
import { ThemeButton } from '@/shared/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = siteConfig.menus;

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex h-20 w-full items-center justify-between pt-4 pb-8 select-none">
      <nav className="flex gap-4">
        {NAV_LINKS.map((item) => {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'font-caveat text-xl',
                pathname === item.href && 'font-semibold',
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <ThemeButton />
    </header>
  );
};
