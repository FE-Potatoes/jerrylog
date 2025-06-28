import { siteConfig } from '@/constants/config';
import { PostCategory } from '@/types/blogType';
import { calGetAllPosts } from '@/utils/dataset';
import { calFormatDateToUS } from '@/utils/date';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: PostCategory; name: string }>;
}): Promise<Metadata> {
  const { category, name } = await params;

  const { metadata } = await import(`@/public/blog/${category}/${name}.mdx`);
  const { title, description, tags } = metadata;

  return {
    title,
    description,
    keywords: tags,
    openGraph: {
      title,
      url: `${siteConfig.url}/blog/${category}/${name}`,
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

  const { title, date, author } = metadata;

  const categoryLabel = category === 'dev' ? 'Dev' : 'Life';
  const transformDate = calFormatDateToUS(date);

  return (
    <article className="post-mdx m-auto mt-[1rem] max-w-[768px] md:mt-[2rem]">
      <header className="font-arita mb-[3rem] flex flex-col font-semibold">
        <h1 className="font-arita text-xl">{title}</h1>
        <time className="text-secondary mb-2 text-sm leading-7 font-light">
          {categoryLabel} ﹒ {transformDate}
        </time>
        <span className="text-secondary text-sm font-light">by {author}</span>
      </header>
      <Mdx />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await calGetAllPosts();
  return posts;
}
