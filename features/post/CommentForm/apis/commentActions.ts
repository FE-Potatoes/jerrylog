'use server';

import { supabase } from '@/shared/lib/utils/supabase';
import { PostCategory } from '@/shared/types/blogType';
import { revalidatePath } from 'next/cache';

export interface CommentBody {
  name: string;
  emoji: string;
  bg_color: string;
  content: string;
  post_slug: string;
}

const url = process.env.NEXT_PUBLIC_URL;

export async function postComment(body: CommentBody, category: PostCategory) {
  const { error } = await supabase.from('comments').insert(body);

  if (error) {
    throw new Error('댓글 등록에 실패했습니다.');
  }

  revalidatePath(`/blog/${category}/${body.post_slug}`);
}

export interface ResCommentItem {
  id: number;
  post_slug: string;
  name: string;
  content: string;
  created_at: string;
  bg_color: string;
  emoji: string;
}

export async function getCommentList(postName: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_slug', postName);

  if (error) {
    console.error('Error fetching comment list:', error);
    return { data: [], error };
  }

  return { data: (data ?? []) as ResCommentItem[], error };
}

export async function sendCommentEmail({
  postname,
  category,
  content,
}: {
  postname: string;
  category: string;
  content: string;
}) {
  fetch(`${url}/api/send-comment-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postname, category, content }),
  });
}
