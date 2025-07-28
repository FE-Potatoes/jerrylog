import { siteConfig } from '@/shared/constants/config';
import { calGetAllPosts } from '@/shared/lib/utils/dataset';
import { PostMeta } from '@/shared/types/blogType';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await calGetAllPosts();
  const baseUrl = siteConfig.url;

  const posts = allPosts.map((post: PostMeta) => ({
    url: `${baseUrl}/blog/${post.category}/${post.name}`,
    lastModified: new Date(post.date).toISOString().split('T')[0],
  }));

  const routes = ['/blog/dev', '/blog/life'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
}
