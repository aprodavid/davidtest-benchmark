'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { BottomAction, Header, Screen } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function RentStep1Page() {
  const router = useRouter();
  const { items, rentDraft, toggleSelect } = useAppState();

  return (
    <Screen>
      <Header title="물품 대여하기" backHref="/" />
      <p className="px-5 py-6 text-4xl text-slate-500">대여할 물품을 선택해주세요 (다중 선택 가능)</p>

      <section className="grid grid-cols-3 gap-3 px-4">
        {items.map((item) => {
          const active = rentDraft.selectedIds.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleSelect(item.id)}
              className={`relative rounded-3xl border p-4 text-center shadow-card ${
                active ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-white'
              }`}
            >
              {active && <Check className="absolute right-3 top-3 h-7 w-7 rounded-full bg-emerald-500 p-1 text-white" />}
              <div className="text-7xl">{item.icon}</div>
              <p className="mt-4 text-4xl font-bold">{item.name}</p>
              <p className="text-3xl text-emerald-700">남은 수량: {item.remaining}개</p>
            </button>
          );
        })}
      </section>

      <BottomAction
        label="다음 단계로"
        disabled={rentDraft.selectedIds.length === 0}
        onClick={() => router.push('/rent/step-2')}
      />
    </Screen>
  );
}
