'use client';

import { Header, Screen } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function AdminHistoryPage() {
  const { records } = useAppState();

  return (
    <Screen>
      <Header title="전체 대여 기록" backHref="/admin" />
      <p className="px-5 py-6 text-4xl text-slate-500">모든 대여 및 반납 기록입니다.</p>

      <section className="space-y-3 px-4 pb-6">
        {records.map((record) => (
          <article
            key={record.id}
            className={`rounded-3xl border p-4 shadow-card ${
              record.status === 'borrowed' ? 'border-emerald-300 bg-white' : 'border-slate-200 bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between text-2xl text-slate-400">
              <span className={`rounded-lg px-2 py-1 ${record.status === 'borrowed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                {record.status === 'borrowed' ? '대여중' : '반납완료'}
              </span>
              <span>{record.rentedAt}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-6xl">{record.icon}</span>
              <div>
                <p className="text-5xl font-bold">{record.itemName} x{record.quantity}</p>
                <p className="text-3xl text-slate-500">{record.borrowerText}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </Screen>
  );
}
