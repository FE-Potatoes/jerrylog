// app/api/send-comment-email/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { postname, category, content } = body;

    if (!postname || !category || !content) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid input' },
        { status: 400 },
      );
    }

    const html = `
      <div>
        <a
          href="https://www.jerrychu.me/blog/${category}/${postname}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${postname}
        </a>
        <p>${content}</p>
      </div>
    `;

    const res = await resend.emails.send({
      from: 'Jerrychu blog <support@jerrychu.me>',
      to: ['khchu1220@naver.com'],
      subject: `${postname}에 댓글이 달렸습니다.`,
      html,
    });

    return NextResponse.json({ status: 'ok', data: res });
  } catch (e) {
    console.error('이메일 발송 실패:', e);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
