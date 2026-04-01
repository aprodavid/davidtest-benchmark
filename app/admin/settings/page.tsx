'use client';

import { useState } from 'react';
import { Header, Screen } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function AdminSettingsPage() {
  const { changePassword } = useAppState();
  const [nextPassword, setNextPassword] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Screen>
      <Header title="관리자 설정" backHref="/admin" />
      <section className="mx-4 mt-8 rounded-3xl bg-white p-6 shadow-card">
        <h2 className="text-5xl font-bold">비밀번호 변경 (데모)</h2>
        <p className="mt-2 text-3xl text-slate-500">실서비스 인증이 아닌 로컬 상태 기반 데모입니다.</p>
        <input
          type="password"
          value={nextPassword}
          onChange={(e) => setNextPassword(e.target.value)}
          className="mt-6 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-4xl"
          placeholder="새 비밀번호"
        />
        <button
          className="mt-4 w-full rounded-2xl bg-slate-800 py-3 text-4xl font-bold text-white"
          onClick={() => {
            if (!nextPassword.trim()) return;
            changePassword(nextPassword.trim());
            setNextPassword('');
            setMessage('변경되었습니다. 다음 로그인부터 적용됩니다.');
          }}
        >
          변경하기
        </button>
        {message && <p className="mt-3 text-3xl text-emerald-700">{message}</p>}
      </section>
    </Screen>
  );
}
