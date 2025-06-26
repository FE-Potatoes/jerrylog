'use client';

import { PostMeta } from '@/types/blogType';
import { motion } from 'framer-motion';

import Post from '../common/PostCard';

export default function BlogPosts({ sortPosts }: { sortPosts: PostMeta[] }) {
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
      {sortPosts.map((item) => {
        const { name, title, date, image: imageSrc, category } = item;

        return (
          <motion.article
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
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
