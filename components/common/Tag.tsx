export default function Tag({
  children,
  onclick,
}: {
  children: React.ReactNode;
  onclick: () => void;
}) {
  return (
    <button
      className="bg-thirdary border-thirdary font-pretandard hover:text h-fit w-fit shrink-0 cursor-pointer rounded-lg border-1 px-2 py-0.5 text-xs text-nowrap transition-colors hover:bg-gray-300"
      onClick={onclick}
      aria-label={`${children}로 필터링`}
    >
      {children}
    </button>
  );
}
