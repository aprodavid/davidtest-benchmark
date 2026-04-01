'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { AppShell, BottomCTA, LoadingBlock, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function BorrowSelectPage() {
  const router = useRouter();
  const { hydrated, items, draft, toggleDraftItem, getRemainingCount } = useAppState();

  if (!hydrated) {
    return (
      <AppShell>
        <TopBar title="물품 대여하기" backHref="/" />
        <LoadingBlock />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopBar title="물품 대여하기" backHref="/" />
      <p className="px-5 pb-5 pt-7 text-[22px] text-slate-500">대여할 물품을 선택해주세요 (다중 선택 가능)</p>

      <section className="grid grid-cols-3 gap-3 px-4 pb-24">
        {items.map((item) => {
          const selected = draft.selectedItemIds.includes(item.id);
          const remain = getRemainingCount(item.id);

          return (
            <button
              key={item.id}
              onClick={() => toggleDraftItem(item.id)}
              className={`relative rounded-3xl border p-4 text-center ${selected ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'}`}
            >
              {selected && <Check className="absolute right-2 top-2 h-6 w-6 rounded-full bg-emerald-500 p-1 text-white" />}
              <div className="text-7xl">{item.icon}</div>
              <p className="mt-3 text-[20px] font-extrabold text-slate-900">{item.name}</p>
              <p className="mt-1 text-[18px] text-emerald-700">남은 수량: {remain}개</p>
            </button>
          );
        })}
      </section>

      <BottomCTA label="다음 단계로" disabled={!draft.selectedItemIds.length} onClick={() => router.push('/borrow/quantity')} />
    </AppShell>
  );
}
