'use client';

import { useRef } from 'react';

import useSearch from '@/hooks/useSearch';
import { PostMeta } from '@/types/blogType';
import { motion, useInView } from 'framer-motion';

import Post from '../common/PostCard';

export default function BlogPosts({ sortPosts }: { sortPosts: PostMeta[] }) {
  const { debounceWords, calFilterPost } = useSearch();
  const filterPosts = calFilterPost(sortPosts, debounceWords);

  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
      {filterPosts.map((item: PostMeta) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { amount: 0.3, once: true });

        const {
          name,
          title,
          date,
          image: imageSrc,
          category,
          link,
          description,
        } = item;

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
              description={description}
              date={date}
              imageSrc={imageSrc}
              category={category}
              link={link}
            />
          </motion.article>
        );
      })}
    </div>
  );
}
