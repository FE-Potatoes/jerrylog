import CoreProvider from '@/features/CoreProvider';
import { seoConfig } from '@/shared/constants/config';
import { aritaFont, caveatFont, notoSansFont } from '@/shared/constants/font';
import { GoogleAdSenseScript } from '@/shared/lib/adsense/GoogleAdsenseScript';
import { cn } from '@/shared/lib/utils/cn';
import '@/shared/styles/global.css';
import { FloatingHeader } from '@/widgets';
import { Footer, Header } from '@/widgets/layout';
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
      <head>
        <GoogleAdSenseScript />
      </head>
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
