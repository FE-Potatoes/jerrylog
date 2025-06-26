import { calGetPosts } from '@/constants/dataset';

export default async function Page({
  params,
}: {
  params: Promise<{ name: string; category: 'dev' | 'life' }>;
}) {
  const { name, category } = await params;
  const { default: Mdx, metadata } = await import(
    `@/public/blog/${category}/${name}.mdx`
  );

  const {
    title,
    description,
    image,
    date,
    author,
    category: fileCategory,
  } = metadata;

  return (
    <article className="post-mdx m-auto mt-[1rem] max-w-[768px] md:mt-[2rem]">
      <header className="font-arita mb-[3rem] flex flex-col font-semibold">
        <h1 className="font-arita text-xl">{title}</h1>
        <time className="text-secondary mb-2 text-sm leading-7 font-light">
          {date}
        </time>
        <span className="text-secondary text-sm font-light">by {author}</span>
      </header>
      <Mdx />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await calGetPosts('dev');
  return posts;
}

export const dynamicParams = false;
