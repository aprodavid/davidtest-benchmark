'use client';

import { useRouter } from 'next/navigation';
import { BottomAction, Header, Screen } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function RentStep2Page() {
  const router = useRouter();
  const { items, rentDraft, setQuantity } = useAppState();
  const selected = items.filter((item) => rentDraft.selectedIds.includes(item.id));

  return (
    <Screen>
      <Header title="물품 대여하기" backHref="/rent/step-1" />
      <p className="px-5 py-6 text-4xl text-slate-500">대여할 수량을 확인 및 조정해주세요</p>

      <div className="space-y-4 px-4">
        {selected.map((item) => {
          const quantity = rentDraft.quantities[item.id] ?? 1;
          return (
            <article key={item.id} className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-card">
              <div className="flex items-center gap-4">
                <span className="text-7xl">{item.icon}</span>
                <div>
                  <h2 className="text-5xl font-bold">{item.name}</h2>
                  <p className="text-3xl text-slate-500">최대 {item.remaining}개 가능</p>
                </div>
              </div>
              {item.quantitySelectable ? (
                <div className="flex items-center gap-5 rounded-2xl border border-slate-200 px-5 py-3 text-5xl font-bold">
                  <button onClick={() => setQuantity(item.id, Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(item.id, Math.min(item.remaining, quantity + 1))}>+</button>
                </div>
              ) : (
                <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-2xl font-semibold text-emerald-800">수량 입력 없음 (1)</div>
              )}
            </article>
          );
        })}
      </div>

      <BottomAction label="다음 단계로" onClick={() => router.push('/rent/borrower')} />
    </Screen>
  );
}
