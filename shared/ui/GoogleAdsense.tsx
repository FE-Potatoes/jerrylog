'use client';

import React, { useEffect } from 'react';

import { siteConfig } from '@/shared/constants/config';

interface AdComponentProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  style?: React.CSSProperties;
}
const GoogleAdsense: React.FC<AdComponentProps> = ({
  adSlot,
  adFormat = 'auto',
  adLayout = '',
  style,
}) => {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error('Error loading ads:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={siteConfig.googleAdsenseId}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-ad-layout={adLayout}
    ></ins>
  );
};

export default GoogleAdsense;
