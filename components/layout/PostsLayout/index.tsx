'use client';

import { motion } from 'framer-motion';

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      className="flex flex-col gap-6 md:grid md:grid-cols-3"
    >
      {children}
    </motion.div>
  );
}
