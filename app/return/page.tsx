'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell, BottomCTA, LoadingBlock, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function ReturnPage() {
  const router = useRouter();
  const { hydrated, activeLoans, submitReturn } = useAppState();
  const [selected, setSelected] = useState<string[]>([]);

  if (!hydrated) return <AppShell><TopBar title="물품 반납하기" backHref="/" /><LoadingBlock /></AppShell>;

  const toggle = (loanId: string) => setSelected((prev) => (prev.includes(loanId) ? prev.filter((id) => id !== loanId) : [...prev, loanId]));

  return (
    <AppShell>
      <TopBar title="물품 반납하기" backHref="/" />
      <p className="mb-4 break-keep text-sm text-slate-500 sm:text-base">현재 대여 중인 항목입니다. 반납할 항목을 선택하세요.</p>

      <section className="grid gap-3 pb-24 md:grid-cols-2">
        {activeLoans.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">현재 대여 중인 항목이 없습니다.</div> : null}
        {activeLoans.map((loan) => {
          const checked = selected.includes(loan.id);
          const lineSummary = loan.lines.map((line) => `${line.itemName} ${line.quantity}개`).join(', ');
          return (
            <button key={loan.id} onClick={() => toggle(loan.id)} className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left">
              <div className="flex items-start gap-3">
                <span className={`mt-1 inline-block h-5 w-5 shrink-0 rounded-full border ${checked ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`} />
                <div className="min-w-0">
                  <p className="break-keep text-base font-bold text-slate-900">{lineSummary}</p>
                  <p className="mt-1 text-sm text-slate-600">대여자: {loan.borrowerLabel}</p>
                  <p className="text-sm text-slate-500">대여일시: {loan.borrowedAt}</p>
                </div>
              </div>
            </button>
          );
        })}
      </section>

      <BottomCTA label={`선택한 ${selected.length}건 반납 완료`} disabled={!selected.length} onClick={() => { submitReturn(selected); router.push('/admin/history'); }} />
    </AppShell>
  );
}
