'use client';

import { AppShell, LoadingBlock, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function AdminHistoryPage() {
  const { hydrated, history } = useAppState();

  if (!hydrated) return <AppShell><TopBar title="전체 대여 기록" backHref="/admin" /><LoadingBlock /></AppShell>;

  return (
    <AppShell>
      <TopBar title="전체 대여 기록" backHref="/admin" />
      <p className="mb-4 text-sm text-slate-500">모든 대여 및 반납 기록입니다.</p>
      <section className="space-y-3">
        {history.map((entry) => (
          <article key={entry.id} className={`rounded-2xl border p-4 ${entry.status === 'borrowed' ? 'border-emerald-200 bg-white' : 'border-slate-200 bg-slate-50'}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className={`rounded-lg px-2 py-1 text-xs font-semibold ${entry.status === 'borrowed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                {entry.status === 'borrowed' ? '대여중' : '반납완료'}
              </span>
              <span className="text-xs text-slate-500">{entry.status === 'borrowed' ? entry.borrowedAt : entry.returnedAt}</span>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <span className="text-3xl">{entry.line.icon}</span>
              <div className="min-w-0">
                <p className="break-keep text-base font-bold text-slate-900">{entry.line.itemName} x{entry.line.quantity}</p>
                <p className="text-sm text-slate-500">{entry.borrowerLabel}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
