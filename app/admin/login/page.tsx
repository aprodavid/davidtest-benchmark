'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Screen } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function AdminLoginPage() {
  const router = useRouter();
  const { verifyAdmin } = useAppState();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <Screen>
      <Header title="관리자 인증" backHref="/" />
      <section className="mx-4 mt-24 rounded-3xl bg-white p-8 text-center shadow-card">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-5xl">⚙️</div>
        <h2 className="mt-6 text-6xl font-extrabold">관리자 인증</h2>
        <p className="mt-3 text-3xl text-slate-500">비밀번호를 입력해주세요. (데모 기본값: 0000)</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
          className="mt-6 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-5xl font-semibold"
        />
        {error && <p className="mt-2 text-2xl text-rose-500">{error}</p>}
        <button
          onClick={() => {
            if (verifyAdmin(password)) {
              router.push('/admin');
              return;
            }
            setError('비밀번호가 일치하지 않습니다.');
          }}
          className="mt-4 w-full rounded-2xl bg-slate-800 py-4 text-4xl font-bold text-white"
        >
          확인
        </button>
      </section>
    </Screen>
  );
}
