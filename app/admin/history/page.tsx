'use client';

import { AppShell, LoadingBlock, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function AdminHistoryPage() {
  const { hydrated, history } = useAppState();

  if (!hydrated) {
    return (
      <AppShell>
        <TopBar title="전체 대여 기록" backHref="/admin" />
        <LoadingBlock />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopBar title="전체 대여 기록" backHref="/admin" />
      <p className="px-5 pb-5 pt-7 text-[22px] text-slate-500">모든 대여 및 반납 기록입니다.</p>

      <section className="space-y-3 px-4 pb-6">
        {history.map((entry) => (
          <article
            key={entry.id}
            className={`rounded-3xl border p-4 ${entry.status === 'borrowed' ? 'border-emerald-200 bg-white' : 'border-slate-200 bg-slate-100'}`}
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-lg px-2 py-1 text-[14px] font-semibold ${entry.status === 'borrowed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                {entry.status === 'borrowed' ? '대여중' : '반납완료'}
              </span>
              <span className="text-[14px] text-slate-400">{entry.status === 'borrowed' ? entry.borrowedAt : entry.returnedAt}</span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-6xl">{entry.line.icon}</span>
              <div>
                <p className="text-[24px] font-extrabold text-slate-900">{entry.line.itemName} x{entry.line.quantity}</p>
                <p className="text-[18px] text-slate-500">{entry.borrowerLabel}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
