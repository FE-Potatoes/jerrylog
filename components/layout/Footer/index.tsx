import React from 'react';

import { siteConfig } from '@/app/config';
import ContactsIcon, { ContactType } from '@/components/common/ContactsIcon';
import LinkExternal from '@/components/common/LinkExternal';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="pb-8 text-sm">
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
      <div className="max-w-content mx-auto text-end font-serif text-sm">
        Copyright ©{' '}
        <Link className="link" href="/">
          JerryChu blog{' '}
        </Link>
        <LinkExternal href="https://nextjs.org/">
          Powered by Next.js
        </LinkExternal>
      </div>
    </footer>
  );
}
