import { siteConfig } from '@/shared/constants/config';
import { cn } from '@/shared/lib/utils/cn';
import { ContactType, ContactsIcon, LinkExternal } from '@/shared/ui';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full pb-8 text-sm">
      <div className="max-w-content mx-auto mb-1 flex justify-end gap-4 text-end font-serif text-sm">
        {Object.keys(siteConfig.author.contacts).map((contactKey) => {
          const contactValue =
            siteConfig.author.contacts[
              contactKey as keyof typeof siteConfig.author.contacts
            ];

          return (
            <span key={contactKey}>
              <LinkExternal href={contactValue} className="link">
                <ContactsIcon contact={contactKey as ContactType} />
              </LinkExternal>
            </span>
          );
        })}
      </div>
      <div
        className={cn('max-w-content font-caveat mx-auto text-end text-[1rem]')}
      >
        Copyright ©{' '}
        <Link className="link" href="/">
          JerryChu{' '}
        </Link>
        <LinkExternal href="https://nextjs.org/">
          Powered by Next.js
        </LinkExternal>
      </div>
    </footer>
  );
}
