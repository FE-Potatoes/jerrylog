'use client';

import { useEffect, useRef } from 'react';

import { PostMeta } from '@/types/blogType';
import { motion, useInView } from 'framer-motion';

import Post from '../common/PostCard';

export default function BlogPosts({ sortPosts }: { sortPosts: PostMeta[] }) {
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
      {sortPosts.map((item: PostMeta) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { amount: 0.3, once: true });

        const { name, title, date, image: imageSrc, category } = item;

        return (
          <motion.article
            key={name}
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView && { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Post
              key={name}
              name={name}
              title={title}
              date={date}
              imageSrc={imageSrc}
              category={category}
            />
          </motion.article>
        );
      })}
    </div>
  );
}
