import { Suspense } from 'react';

import { CommentContainer } from '@/features/post';
import { siteConfig } from '@/shared/constants/config';
import { calGetAllPosts } from '@/shared/lib/utils/dataset';
import { calFormatDateToUS } from '@/shared/lib/utils/date';
import { calJsonLd } from '@/shared/lib/utils/jsonLd';
import { PostCategory } from '@/shared/types/blogType';
import GoogleAdsense from '@/shared/ui/GoogleAdsense';
import { Metadata } from 'next';

export const dynamic = 'force-static';

// eslint-disable-next-line react-refresh/only-export-components
export async function generateStaticParams() {
  const posts = await calGetAllPosts();
  return posts;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: PostCategory; name: string }>;
}): Promise<Metadata> {
  const { category, name } = await params;

  const { metadata } = await import(`@/public/blog/${category}/${name}.mdx`);
  const { title, description, tags, image } = metadata;

  return {
    alternates: {
      canonical: `${siteConfig.url}/blog/${category}/${name}`,
      languages: {
        'ko-KR': `${siteConfig.url}/blog/${category}/${name}`,
      },
    },
    title,
    description,
    keywords: tags,
    openGraph: {
      title,
      url: `${siteConfig.url}/blog/${category}/${name}`,
      images: [{ url: image, alt: title }],
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ name: string; category: PostCategory }>;
}) {
  const { name, category } = await params;
  const { default: Mdx, metadata } = await import(
    `@/public/blog/${category}/${name}.mdx`
  );

  const { title, date, author, description } = metadata;

  const categoryLabel = category === PostCategory.Dev ? 'Dev' : 'Life';
  const transformDate = calFormatDateToUS(date);

  const jsonLd = calJsonLd({
    title,
    date: new Date(date).toISOString(),
    summary: description,
    category,
    name,
  });

  return (
    <div className="m-auto max-w-[768px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="post-mdx mt-[1rem] mb-[5rem] md:mt-[2rem]">
        <header className="font-arita mb-[3rem] flex flex-col font-semibold">
          <h1 className="font-arita text-xl">{title}</h1>
          <time className="text-secondary mb-2 text-sm leading-7 font-light">
            {categoryLabel} ﹒ {transformDate}
          </time>
          <span className="text-secondary text-sm font-light">by {author}</span>
        </header>
        <Suspense fallback={<>loading...</>}>
          <GoogleAdsense
            adSlot="6658213274"
            adFormat="fluid"
            adLayout="in-article"
            style={{
              textAlign: 'center',
            }}
          />
        </Suspense>
        <Mdx />
      </article>
      <Suspense fallback={<>loading...</>}>
        <CommentContainer name={name} category={category} />
        <GoogleAdsense
          adSlot="7547367196"
          adFormat="autorelaxed"
          style={{
            marginTop: '2rem',
          }}
        />
      </Suspense>
    </div>
  );
}
