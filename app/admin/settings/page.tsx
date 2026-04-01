'use client';

import { useState } from 'react';
import { AppShell, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function AdminSettingsPage() {
  const { updateAdminPin } = useAppState();
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  return (
    <AppShell>
      <TopBar title="관리자 설정" backHref="/admin" />
      <section className="mx-4 mt-8 rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-[34px] font-extrabold">관리자 비밀번호 변경</h2>
        <p className="mt-2 text-[18px] text-slate-500">데모용 로컬 저장 데이터에 반영됩니다.</p>

        <input
          type="password"
          value={pin}
          onChange={(event) => setPin(event.target.value)}
          className="mt-6 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[26px]"
          placeholder="새 비밀번호"
        />

        <button
          className="mt-4 w-full rounded-2xl bg-slate-800 py-3 text-[24px] font-bold text-white"
          onClick={() => {
            if (!pin.trim()) return;
            updateAdminPin(pin.trim());
            setPin('');
            setMessage('관리자 비밀번호를 변경했습니다.');
          }}
        >
          변경하기
        </button>

        {message && <p className="mt-3 text-[16px] text-emerald-700">{message}</p>}
      </section>
    </AppShell>
  );
}
