'use client';

import ErrorButton from '@/components/common/ErrorButton';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  const onClickHome = () => router.push('/');
  const onClickBack = () => router.back();

  return (
    <section className="font-arita">
      <h1 className="font-arita mb-2" tabIndex={-1}>
        [404 Not Found] 페이지를 찾을 수 없습니다
      </h1>
      <p>주소가 잘못되었거나 삭제된 페이지입니다.</p>
      <br />
      <div className="text-md flex gap-2 text-sm">
        <ErrorButton autoFocus onClick={onClickHome}>
          홈으로 가기
        </ErrorButton>
        <ErrorButton onClick={onClickBack}>이전으로 돌아가기</ErrorButton>
      </div>
    </section>
  );
}
