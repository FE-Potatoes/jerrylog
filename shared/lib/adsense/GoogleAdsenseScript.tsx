import { FunctionComponent } from 'react';

import Script from 'next/script';

export const GoogleAdSenseScript: FunctionComponent = () => {
  if (process.env.NEXT_PUBLIC_URL !== 'https://www.jerrychu.me') {
    return null;
  }
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4761019594552611"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};
