'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell, BottomCTA, LoadingBlock, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function ReturnPage() {
  const router = useRouter();
  const { hydrated, activeLoans, submitReturn } = useAppState();
  const [selected, setSelected] = useState<string[]>([]);

  if (!hydrated) {
    return (
      <AppShell>
        <TopBar title="물품 반납하기" backHref="/" />
        <LoadingBlock />
      </AppShell>
    );
  }

  const toggle = (loanId: string) => {
    setSelected((prev) => (prev.includes(loanId) ? prev.filter((id) => id !== loanId) : [...prev, loanId]));
  };

  return (
    <AppShell>
      <TopBar title="물품 반납하기" backHref="/" />
      <p className="break-keep px-5 pb-5 pt-7 text-[clamp(1rem,2.1vw,1.375rem)] text-slate-500 sm:px-6">
        현재 대여 중인 항목입니다. 반납할 항목을 선택하세요.
      </p>

      <section className="grid grid-cols-1 gap-3 px-4 pb-24 sm:px-6 lg:grid-cols-2">
        {activeLoans.map((loan) =>
          loan.lines.map((line) => {
            const checked = selected.includes(loan.id);
            return (
              <button
                key={`${loan.id}-${line.itemId}`}
                onClick={() => toggle(loan.id)}
                className="rounded-3xl border border-slate-200 bg-white p-4 text-left"
              >
                <div className="grid grid-cols-[28px_72px_minmax(0,1fr)] items-center gap-3">
                  <span
                    className={`h-7 w-7 rounded-full border ${checked ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`}
                  />
                  <span className="text-6xl leading-none">{line.icon}</span>
                  <div className="min-w-0">
                    <p className="break-keep whitespace-normal text-[clamp(1.125rem,2.2vw,1.5rem)] font-extrabold leading-snug text-slate-900">
                      {line.itemName} <span className="text-rose-500">{line.quantity}개</span>
                    </p>
                    <p className="break-keep whitespace-normal text-[clamp(0.95rem,1.8vw,1.125rem)] text-slate-500">{loan.borrowerLabel}</p>
                    <p className="break-keep whitespace-normal text-[clamp(0.95rem,1.8vw,1.125rem)] text-slate-500">{loan.borrowedAt}</p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </section>

      <BottomCTA
        label={`선택한 ${selected.length}건 반납 완료`}
        disabled={!selected.length}
        onClick={() => {
          submitReturn(selected);
          router.push('/admin/history');
        }}
      />
    </AppShell>
  );
}
