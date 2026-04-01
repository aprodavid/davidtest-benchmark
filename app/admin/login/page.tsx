'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';
import { AppShell, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function AdminLoginPage() {
  const router = useRouter();
  const { verifyAdminPin } = useAppState();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  return (
    <AppShell>
      <TopBar title="관리자 인증" backHref="/" />
      <section className="mx-auto mt-8 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100"><Settings className="h-8 w-8 text-slate-500" /></div>
        <h2 className="mt-4 text-2xl font-extrabold">관리자 인증</h2>
        <p className="mt-2 break-keep text-sm text-slate-500">비밀번호를 입력해주세요. (초기 비밀번호: 0000)</p>
        <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="비밀번호 입력" className="mt-5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-lg font-semibold" />
        {error ? <p className="mt-2 text-sm text-rose-500">{error}</p> : null}
        <button className="mt-4 w-full rounded-xl bg-slate-800 py-3 text-base font-bold text-white" onClick={() => {
          if (verifyAdminPin(pin)) return router.push('/admin');
          setError('비밀번호가 올바르지 않습니다.');
        }}>확인</button>
      </section>
    </AppShell>
  );
}
