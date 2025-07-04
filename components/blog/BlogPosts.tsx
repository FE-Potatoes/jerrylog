'use client';

import { useRef } from 'react';

import { PostMeta } from '@/types/blogType';
import { motion, useInView } from 'framer-motion';

import Post from '../common/PostCard';

const BlogPosts = ({ posts }: { posts: PostMeta[] }) => {
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
      {posts.map((item) => (
        <BlogPost key={item.name} {...item} />
      ))}
    </div>
  );
};

function BlogPost({ ...item }) {
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
}

export default BlogPosts;
