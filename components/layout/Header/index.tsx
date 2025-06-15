import { siteConfig } from '@/app/config';
import ThemeButton from '@/components/ThemeButton';
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

export default function Header() {
  return (
    <nav className="flex w-full items-center justify-between pt-8 pb-12 select-none">
      <div>
        {NAV_LINKS.map((item) => {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="ml-4 text-sm font-semibold text-gray-700 hover:text-gray-900"
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <div>
        <ThemeButton />
      </div>
    </nav>
  );
}
