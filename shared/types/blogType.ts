export type PostCategory = 'dev' | 'life';
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
