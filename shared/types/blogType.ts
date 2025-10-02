export const PostCategory = {
  Dev: 'dev',
  Life: 'life',
} as const;

export type PostCategory = (typeof PostCategory)[keyof typeof PostCategory];
export type PostMeta = {
  author: string;
  category: PostCategory;
  date: string;
  description: string;
  link?: string;
  icon?: string;
  image: string;
  name: string;
  tags: string[];
  title: string;
};
