import { PostMeta } from '@/shared/types/blogType';
import { PostCard } from '@/widgets';

import { BlogPostWrapper } from './BlogPostWrapper';

export const BlogPosts = ({ posts }: { posts: PostMeta[] }) => {
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
      {posts.map((item) => {
        const { name, title, description, date, image, category, link } = item;
        return (
          <BlogPostWrapper key={name}>
            <PostCard
              name={name}
              title={title}
              description={description}
              date={date}
              imageSrc={image}
              category={category}
              link={link}
            />
          </BlogPostWrapper>
        );
      })}
    </div>
  );
};
