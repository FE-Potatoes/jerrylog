import { FunctionComponent } from 'react';

import { siteConfig } from '@/shared/constants/config';
import Script from 'next/script';

export const GoogleAdSenseScript: FunctionComponent = () => {
  if (process.env.NEXT_PUBLIC_URL !== 'https://www.jerrychu.me') {
    return null;
  }
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.googleAdsenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};
