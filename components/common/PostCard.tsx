import { PostCategory } from '@/types/blogType';
import { calFormatDateToDot } from '@/utils/date';
import Image from 'next/image';
import Link from 'next/link';

import ExternalIcon from '../icons/ExternalIcon';
import LinkExternal from './LinkExternal';

export interface PostProps {
  name: string;
  title: string;
  date: string;
  imageSrc: string;
  category: PostCategory;
  link?: string;
  description: string;
}

export default function PostCard({
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
      <div className="relative aspect-[5/3]">
        <Image
          className="rounded-t-lg object-cover"
          src={imageSrc}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="bg-thirdary relative flex-[1] rounded-b-lg px-4 pt-3 pb-2">
        <h3 className="font-arita mb-2 line-clamp-2 text-[0.875rem] leading-5 font-semibold">
          {title}
        </h3>
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
        className="flex h-full cursor-pointer flex-col"
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
      className="flex h-full cursor-pointer flex-col"
    >
      {commonContent}
    </Link>
  );
}
