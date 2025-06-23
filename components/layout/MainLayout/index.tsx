import FloatingHeader from '@/components/common/FloatingHeader';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative pb-16">
      <FloatingHeader />
      {children}
    </main>
  );
}
