'use client';

import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { ThemeProvider } from 'next-themes';

export default function CoreProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ProgressProvider
        height="4px"
        color="#a3a3a3"
        options={{ showSpinner: false }}
        shallowRouting // 파라미터, 해스 변경할 때 프로그레스바를 표시하지 않음
        delay={300} // 0.3초 미만일 때 표시하지 않음
      >
        {children}
      </ProgressProvider>
    </ThemeProvider>
  );
}
