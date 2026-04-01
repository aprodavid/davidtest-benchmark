'use client';

import { useRouter } from 'next/navigation';
import { AppShell, BottomCTA, LoadingBlock, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function BorrowQuantityPage() {
  const router = useRouter();
  const { hydrated, items, draft, setDraftQuantity, getRemainingCount } = useAppState();

  if (!hydrated) {
    return (
      <AppShell>
        <TopBar title="물품 대여하기" backHref="/borrow/select" />
        <LoadingBlock />
      </AppShell>
    );
  }

  const selected = items.filter((item) => draft.selectedItemIds.includes(item.id));

  return (
    <AppShell>
      <TopBar title="물품 대여하기" backHref="/borrow/select" />
      <p className="px-5 pb-5 pt-7 text-[22px] text-slate-500">대여할 수량을 확인 및 조정해주세요</p>

      <section className="space-y-4 px-4 pb-24">
        {selected.map((item) => {
          const quantity = draft.quantities[item.id] ?? 1;
          const max = getRemainingCount(item.id);

          return (
            <article key={item.id} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-4">
                <span className="text-7xl">{item.icon}</span>
                <div>
                  <h2 className="text-[24px] font-extrabold">{item.name}</h2>
                  <p className="text-[20px] text-slate-500">최대 {max}개 가능</p>
                </div>
              </div>

              {item.quantitySelectable ? (
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 px-3 py-2 text-3xl font-bold">
                  <button onClick={() => setDraftQuantity(item.id, quantity - 1)}>-</button>
                  <span className="min-w-8 text-center">{quantity}</span>
                  <button onClick={() => setDraftQuantity(item.id, quantity + 1)}>+</button>
                </div>
              ) : (
                <span className="rounded-xl bg-emerald-100 px-3 py-2 text-[20px] font-semibold text-emerald-800">수량 입력 없음 (1)</span>
              )}
            </article>
          );
        })}
      </section>

      <BottomCTA label="다음 단계로" disabled={!selected.length} onClick={() => router.push('/borrow/borrower')} />
    </AppShell>
  );
}
