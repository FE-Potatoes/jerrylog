import React from 'react';

interface BlogIntroduceProps {
  title: string;
  desc: string;
  postLength: number;
}

export default function BlogIntroduce({
  title,
  desc,
  postLength,
}: BlogIntroduceProps) {
  return (
    <>
      <h1 className="mb-4 text-3xl">
        {title} <span className="text-xl">({postLength})</span>
      </h1>
      <p className="font-arita text-secondary mb-8">{desc}</p>
    </>
  );
}
