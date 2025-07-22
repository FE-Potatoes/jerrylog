import FloatingHeader from '@/components/common/FloatingHeader';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { seoConfig } from '@/constants/config';
import { aritaFont, caveatFont, notoSansFont } from '@/constants/font';
import CoreProvider from '@/providers/CoreProvider';
import '@/styles/global.css';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';

// eslint-disable-next-line react-refresh/only-export-components
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
          notoSansFont.variable,
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
