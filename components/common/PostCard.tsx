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
  category: 'dev' | 'life';
  link?: string;
}

export default function PostCard({
  name,
  title,
  date,
  imageSrc,
  category,
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
        />
      </div>
      <div className="bg-thirdary flex-[1] rounded-b-lg px-4 py-2">
        <div className="font-caveat mb-[0.5rem] flex items-center justify-between text-[0.875rem]">
          <div>
            <span>{categoryLabel} ﹒ </span>
            <time className="font-caveat">{transformDate}</time>
          </div>
          {link && <ExternalIcon />}
        </div>
        <h3 className="font-arita line-clamp-1 text-[0.875rem] font-semibold">
          {title}
        </h3>
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
