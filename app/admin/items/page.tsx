'use client';

import { FormEvent, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { AppShell, LoadingBlock, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function AdminItemsPage() {
  const { hydrated, items, addItem, deleteItem } = useAppState();
  const [name, setName] = useState('');
  const [total, setTotal] = useState(1);
  const [quantitySelectable, setQuantitySelectable] = useState(true);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;
    addItem({ name: name.trim(), total, quantitySelectable });
    setName('');
    setTotal(1);
    setQuantitySelectable(true);
  };

  if (!hydrated) {
    return (
      <AppShell>
        <TopBar title="물품 마스터 관리" backHref="/admin" />
        <LoadingBlock />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopBar title="물품 마스터 관리" backHref="/admin" />

      <section className="m-4 rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="flex items-center gap-2 text-[36px] font-extrabold"><PlusCircle className="h-6 w-6 text-blue-500" /> 새 물품 추가</h2>

        <form className="mt-4 space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <div className="flex h-[94px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[16px] text-slate-500">📷<br/>사진</div>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-3 text-[22px] font-semibold"
              placeholder="물품명 (예: 배드민턴 채)"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[20px] text-slate-600">총 보유 수량</p>
            <input
              min={1}
              type="number"
              value={total}
              onChange={(event) => setTotal(Math.max(1, Number(event.target.value) || 1))}
              className="w-24 rounded-2xl border border-slate-200 bg-slate-50 px-2 py-2 text-center text-[30px] font-bold"
            />
          </div>

          <label className="flex items-center gap-2 text-[16px] text-slate-700">
            <input type="checkbox" checked={quantitySelectable} onChange={(event) => setQuantitySelectable(event.target.checked)} className="h-5 w-5" />
            수량 선택 기능 켜기 (체크 해제 시 1개 고정)
          </label>

          <button className="w-full rounded-2xl bg-blue-500 py-3 text-[22px] font-bold text-white">추가하기</button>
        </form>
      </section>

      <section className="px-4 pb-8">
        <h3 className="text-[38px] font-extrabold">등록된 물품 목록</h3>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <article key={item.id} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="text-6xl">{item.icon}</span>
                <div>
                  <p className="text-[22px] font-extrabold text-slate-900">{item.name}</p>
                  <p className="text-[16px] text-slate-500">총 {item.total}개</p>
                </div>
              </div>
              <button onClick={() => deleteItem(item.id)} className="text-rose-400">
                <Trash2 className="h-6 w-6" />
              </button>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
