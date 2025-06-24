import { getPosts } from '@/constants/dataset';

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const { default: Mdx } = await import(`@/public/blog/dev/${name}`);

  return <Mdx />;
}

export async function generateStaticParams() {
  const posts = await getPosts('dev');
  return posts;
}

export const dynamicParams = false;
