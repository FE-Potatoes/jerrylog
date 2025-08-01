'use client';

import React, { useRef } from 'react';

import { motion, useInView } from 'framer-motion';

interface BlogPostWrapperProps {
  children: React.ReactNode;
}

export function BlogPostWrapper({ children }: BlogPostWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView && { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.article>
  );
}
