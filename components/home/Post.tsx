'use client';

import { useRef } from 'react';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export interface PostProps {
  name: string;
  title: string;
  date: string;
  imageSrc: string;
  category: 'dev' | 'life';
}

export default function Post({
  name,
  title,
  date,
  imageSrc,
  category,
}: PostProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const categoryLabel = category === 'dev' ? 'Dev' : 'Life';

  return (
    <motion.article
      key={title}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0 }}
    >
      <Link
        href={`/${category}/${name}`}
        className="flex h-full cursor-pointer flex-col"
      >
        <div className="relative aspect-[5/3] flex-[2] md:aspect-square">
          <Image
            className="rounded-t-lg object-cover"
            src={imageSrc}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      </Link>
    </motion.article>
  );
}
