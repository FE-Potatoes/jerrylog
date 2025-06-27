interface ErrorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  autoFocus?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
export default function ErrorButton({
  onClick,
  autoFocus = false,
  children,
  ...arg
}: ErrorButtonProps) {
  return (
    <button
      autoFocus={autoFocus}
      className="bg-thirdary font-arita text-color rounded px-4 py-2 hover:bg-gray-300"
      onClick={onClick}
      {...arg}
    >
      {children}
    </button>
  );
}
