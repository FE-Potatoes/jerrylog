'use client';

import { PostMeta } from '@/types/blogType';
import { motion } from 'framer-motion';

import PostCard from '../common/PostCard';

export default function HomePosts({
  changesImagesPosts,
}: {
  changesImagesPosts: PostMeta[];
}) {
  const containerVriants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVriants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVriants}
      className="flex flex-col gap-6 md:grid md:grid-cols-3"
    >
      {changesImagesPosts.map((item) => {
        console.log(item);
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
          <motion.article key={title} variants={itemVriants}>
            <PostCard
              key={name}
              name={name}
              title={title}
              date={date}
              description={description}
              imageSrc={imageSrc}
              category={category}
              link={link}
            />
          </motion.article>
        );
      })}
    </motion.div>
  );
}
