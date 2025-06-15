import React from 'react';

import Footer from '../Footer';
import Header from '../Header';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:max-w-6xl lg:px-8">
      <Header />
      <main className="relative pb-16">{children}</main>
      <Footer />
    </div>
  );
}
