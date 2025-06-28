import { PostMeta } from '@/types/blogType';
import { calGetAllPosts } from '@/utils/dataset';
import { MetadataRoute } from 'next';

import { siteConfig } from '../constants/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await calGetAllPosts();
  const baseUrl = siteConfig.url;

  const posts = allPosts.map((post: PostMeta) => ({
    url: `${baseUrl}/blog/${post.category}/${post.name}`,
    lastModified: new Date(post.date).toISOString().split('T')[0],
  }));

  const routes = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
}
