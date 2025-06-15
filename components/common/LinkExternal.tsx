import { cn } from '@/utils/cn';

export default function LinkExternal({
  children,
  className,
  href,
  ...props
}: React.ComponentProps<'a'> & {
  href: string;
  className?: string;
}) {
  return (
    <a
      {...props}
      className={cn('text-primary transition', className)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
