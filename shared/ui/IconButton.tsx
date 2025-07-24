import { cn } from '@/shared/utils/cn';

export function IconButton({
  className,
  type = 'button',
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      aria-label="icon-button"
      {...props}
      type={type}
      className={cn(
        'flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all',
        'text-secondary hover:bg-secondary',
        className,
      )}
    />
  );
}
