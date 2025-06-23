import React from 'react';

import Image from 'next/image';

export interface PostProps {
  title: string;
  date: string;
  imageSrc: string;
  category: 'dev' | 'life';
}

export default function Post({ title, date, imageSrc, category }: PostProps) {
  const categoryLabel = category === 'dev' ? 'Dev' : 'Life';

  return (
    <article className="flex cursor-pointer flex-col">
      <div className="relative aspect-[5/3] flex-[2] md:aspect-square">
        <Image
          className="rounded-t-lg object-cover"
          src={imageSrc}
          alt={title}
          fill
        />
      </div>
      <div className="bg-thirdary flex-[1] rounded-b-lg px-4 py-2">
        <div className="font-caveat mb-[0.5rem] text-[0.875rem]">
          <span>{categoryLabel} ﹒ </span>
          <time className="font-caveat">{date}</time>
        </div>
        <h3 className="font-arita line-clamp-2 text-[0.875rem] font-semibold">
          {title}
        </h3>
      </div>
    </article>
  );
}
