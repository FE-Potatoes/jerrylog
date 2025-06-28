import FloatingHeader from '@/components/common/FloatingHeader';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { aritaFont, caveatFont, pretendardFont } from '@/constants/font';
import CoreProvider from '@/providers/CoreProvider';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';

import { seoConfig } from '../constants/config';
import '../styles/global.css';

export const metadata: Metadata = seoConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          caveatFont.variable,
          aritaFont.variable,
          pretendardFont.variable,
        )}
      >
        <CoreProvider>
          <Header />
          <main className="relative pb-16">
            <FloatingHeader />
            {children}
          </main>
          <Footer />
        </CoreProvider>
      </body>
    </html>
  );
}
