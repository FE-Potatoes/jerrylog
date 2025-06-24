interface BlogLayoutProps {
  title: string;
  description: string;
  postLength: number;
  children: React.ReactNode;
}

export default function BlogLayout({
  title,
  description,
  postLength,
  children,
}: BlogLayoutProps) {
  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-3xl">
        {title} <span className="text-xl">({postLength})</span>
      </h1>
      <p className="font-arita text-secondary mb-8">{description}</p>
      {children}
    </div>
  );
}
