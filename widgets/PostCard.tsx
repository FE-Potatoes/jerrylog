import { calFormatDateToDot } from '@/shared/lib/utils/date';
import { PostCategory } from '@/shared/types/blogType';
import { LinkExternal } from '@/shared/ui';
import { ExternalIcon } from '@/shared/ui/icons';
import Image from 'next/image';
import Link from 'next/link';

export interface PostProps {
  name: string;
  title: string;
  date: string;
  imageSrc: string;
  category: PostCategory;
  link?: string;
  description: string;
}

export function PostCard({
  name,
  title,
  date,
  imageSrc,
  category,
  description,
  link,
}: PostProps) {
  const categoryLabel = category === 'dev' ? 'Dev' : 'Life';
  const transformDate = calFormatDateToDot(date);

  // ** Content 컴포넌트
  const commonContent = (
    <>
      <div className="bg-thirdary relative aspect-[5/3] rounded-t-lg">
        <Image
          className="rounded-t-lg object-cover"
          src={imageSrc}
          alt={title}
          fill
          quality={75}
          priority
          sizes="(max-width: 768px) 83.44vw, 21.56vw"
        />
      </div>
      <div className="bg-thirdary relative flex-[1] rounded-b-lg px-4 pt-3 pb-2">
        <h2 className="font-arita mb-2 line-clamp-2 text-[0.875rem] leading-5 font-semibold">
          {title}
        </h2>
        <p className="font-arita text-secondary mb-[2.4rem] line-clamp-2 min-h-[2rem] overflow-hidden text-xs">
          {description}
        </p>
        <div className="font-caveat absolute inset-x-0 bottom-1 flex w-full items-center justify-between px-4 text-[0.875rem]">
          <div>
            <span>{categoryLabel} ﹒ </span>
            <time className="font-caveat">{transformDate}</time>
          </div>
          {link && <ExternalIcon />}
        </div>
      </div>
    </>
  );

  // ** 이미 작성된 링크가 존재한다면 해당 링크 새탭으로 생성
  if (link && link.length > 0) {
    return (
      <LinkExternal
        href={link}
        className="flex h-full cursor-pointer flex-col rounded-t-lg"
        aria-label={`${title} (새 창으로 열림)`}
      >
        {commonContent}
      </LinkExternal>
    );
  }

  // ** 내부 블로그 path로 이동
  return (
    <Link
      href={`/blog/${category}/${name}`}
      className="flex h-full cursor-pointer flex-col rounded-t-lg"
      prefetch={true}
    >
      {commonContent}
    </Link>
  );
}
