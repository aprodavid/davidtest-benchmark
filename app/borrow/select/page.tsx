'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { AppShell, BottomCTA, LoadingBlock, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function BorrowSelectPage() {
  const router = useRouter();
  const { hydrated, items, draft, toggleDraftItem, getRemainingCount } = useAppState();

  if (!hydrated) return <AppShell><TopBar title="물품 대여하기" backHref="/" /><LoadingBlock /></AppShell>;

  return (
    <AppShell>
      <TopBar title="물품 대여하기" backHref="/" />
      <p className="mb-4 break-keep text-sm text-slate-500 sm:text-base">대여할 물품을 선택해주세요 (다중 선택 가능)</p>
      <section className="grid grid-cols-2 gap-3 pb-24 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => {
          const selected = draft.selectedItemIds.includes(item.id);
          const remain = getRemainingCount(item.id);
          return (
            <button key={item.id} onClick={() => toggleDraftItem(item.id)} className={`relative rounded-2xl border p-4 text-left ${selected ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
              {selected && <Check className="absolute right-2 top-2 h-5 w-5 rounded-full bg-emerald-500 p-1 text-white" />}
              <div className="text-4xl">{item.icon}</div>
              <p className="mt-2 break-keep text-base font-bold text-slate-900">{item.name}</p>
              <p className="mt-1 text-sm text-emerald-700">남은 수량: {remain}개</p>
            </button>
          );
        })}
      </section>
      <BottomCTA label="다음 단계로" disabled={!draft.selectedItemIds.length} onClick={() => router.push('/borrow/quantity')} />
    </AppShell>
  );
}
