'use client';

import { useRouter } from 'next/navigation';
import { AppShell, BottomCTA, LoadingBlock, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function BorrowQuantityPage() {
  const router = useRouter();
  const { hydrated, items, draft, setDraftQuantity, getRemainingCount } = useAppState();

  if (!hydrated) return <AppShell><TopBar title="물품 대여하기" backHref="/borrow/select" /><LoadingBlock /></AppShell>;

  const selected = items.filter((item) => draft.selectedItemIds.includes(item.id));

  return (
    <AppShell>
      <TopBar title="물품 대여하기" backHref="/borrow/select" />
      <p className="mb-4 break-keep text-sm text-slate-500 sm:text-base">대여할 수량을 확인 및 조정해주세요</p>
      <section className="space-y-3 pb-24">
        {selected.map((item) => {
          const quantity = draft.quantities[item.id] ?? 1;
          const max = getRemainingCount(item.id);
          return (
            <article key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-4xl">{item.icon}</span>
                <div className="min-w-0">
                  <h2 className="break-keep text-lg font-bold">{item.name}</h2>
                  <p className="text-sm text-slate-500">최대 {max}개 가능</p>
                </div>
              </div>
              {item.quantitySelectable ? (
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-2 py-1 text-lg font-bold">
                  <button onClick={() => setDraftQuantity(item.id, quantity - 1)} className="h-8 w-8 rounded-md hover:bg-slate-100">-</button>
                  <span className="min-w-8 text-center">{quantity}</span>
                  <button onClick={() => setDraftQuantity(item.id, quantity + 1)} className="h-8 w-8 rounded-md hover:bg-slate-100">+</button>
                </div>
              ) : (
                <span className="rounded-lg bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-800">수량 입력 없음 (1)</span>
              )}
            </article>
          );
        })}
      </section>
      <BottomCTA label="다음 단계로" disabled={!selected.length} onClick={() => router.push('/borrow/borrower')} />
    </AppShell>
  );
}
