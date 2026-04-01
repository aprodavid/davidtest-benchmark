'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomAction, Header, Screen } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function ReturnPage() {
  const router = useRouter();
  const { records, completeReturn } = useAppState();
  const [selected, setSelected] = useState<string[]>([]);

  const borrowed = records.filter((r) => r.status === 'borrowed');

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  return (
    <Screen>
      <Header title="물품 반납하기" backHref="/" />
      <p className="px-5 py-6 text-4xl text-slate-500">현재 대여 중인 항목입니다. 반납할 항목을 선택하세요.</p>

      <section className="grid grid-cols-2 gap-3 px-4">
        {borrowed.map((record) => (
          <button key={record.id} onClick={() => toggle(record.id)} className="rounded-3xl bg-white p-3 text-left shadow-card">
            <div className="flex items-start gap-3">
              <span className={`mt-9 h-9 w-9 rounded-full border ${selected.includes(record.id) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`} />
              <span className="text-7xl">{record.icon}</span>
              <div>
                <p className="text-5xl font-bold">{record.itemName} <span className="text-rose-500">{record.quantity}개</span></p>
                <p className="text-3xl text-slate-500">{record.borrowerText}</p>
                <p className="text-3xl text-slate-500">{record.rentedAt}</p>
              </div>
            </div>
          </button>
        ))}
      </section>

      <BottomAction
        label={`선택한 ${selected.length}건 반납 완료`}
        disabled={selected.length === 0}
        onClick={() => {
          completeReturn(selected);
          router.push('/admin/history');
        }}
      />
    </Screen>
  );
}
