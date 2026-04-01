'use client';

import { FormEvent, useState } from 'react';
import { Header, Screen } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

export default function AdminItemsPage() {
  const { items, addItem, removeItem } = useAppState();
  const [name, setName] = useState('');
  const [total, setTotal] = useState(1);
  const [quantitySelectable, setQuantitySelectable] = useState(true);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    addItem({ name: name.trim(), total: Math.max(1, total), quantitySelectable });
    setName('');
    setTotal(1);
    setQuantitySelectable(true);
  };

  return (
    <Screen>
      <Header title="물품 마스터 관리" backHref="/admin" />

      <section className="mx-4 mt-5 rounded-3xl bg-white p-5 shadow-card">
        <h2 className="text-5xl font-bold text-slate-800">새 물품 추가</h2>
        <form className="mt-4 space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <div className="flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-2xl text-slate-500">사진</div>
            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 text-4xl"
              placeholder="물품명"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-4xl text-slate-600">총 보유 수량</span>
            <input
              type="number"
              min={1}
              className="w-24 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-4xl"
              value={total}
              onChange={(e) => setTotal(Number(e.target.value))}
            />
          </div>
          <label className="flex items-center gap-2 text-3xl text-slate-600">
            <input type="checkbox" checked={quantitySelectable} onChange={(e) => setQuantitySelectable(e.target.checked)} />
            수량 선택 기능 켜기 (해제 시 1개 고정)
          </label>
          <button className="w-full rounded-2xl bg-blue-500 py-3 text-4xl font-bold text-white">추가하기</button>
        </form>
      </section>

      <section className="px-4 py-6">
        <h3 className="text-5xl font-bold">등록된 물품 목록</h3>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <article key={item.id} className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-card">
              <div className="flex items-center gap-3">
                <span className="text-6xl">{item.icon}</span>
                <div>
                  <p className="text-4xl font-bold">{item.name}</p>
                  <p className="text-3xl text-slate-500">총 {item.total}개</p>
                </div>
              </div>
              <button className="text-rose-400" onClick={() => removeItem(item.id)}>🗑️</button>
            </article>
          ))}
        </div>
      </section>
    </Screen>
  );
}
