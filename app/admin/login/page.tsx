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
      <section className="mx-4 mt-16 rounded-3xl border border-slate-200 bg-white p-6 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
          <Settings className="h-12 w-12 text-slate-400" />
        </div>
        <h2 className="mt-6 text-[52px] font-extrabold">관리자 인증</h2>
        <p className="mt-2 text-[20px] text-slate-500">비밀번호를 입력해주세요. (초기 비밀번호: 0000)</p>

        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="비밀번호 입력"
          className="mt-6 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-[42px] font-semibold"
        />
        {error && <p className="mt-2 text-[16px] text-rose-500">{error}</p>}

        <button
          className="mt-4 w-full rounded-2xl bg-slate-800 py-4 text-[40px] font-bold text-white"
          onClick={() => {
            if (verifyAdminPin(pin)) {
              router.push('/admin');
              return;
            }
            setError('비밀번호가 올바르지 않습니다.');
          }}
        >
          확인
        </button>
      </section>
    </AppShell>
  );
}
