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

  if (!hydrated) return <AppShell><TopBar title="물품 마스터 관리" backHref="/admin" /><LoadingBlock /></AppShell>;

  return (
    <AppShell>
      <TopBar title="물품 마스터 관리" backHref="/admin" />
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="flex items-center gap-2 text-xl font-extrabold"><PlusCircle className="h-5 w-5 text-blue-500" />새 물품 추가</h2>
        <form className="mt-4 space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-3 sm:grid-cols-[100px_1fr]">
            <div className="flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500">📷 사진</div>
            <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-base" placeholder="물품명 (예: 배드민턴 채)" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-slate-600">총 보유 수량</p>
            <input min={1} type="number" value={total} onChange={(event) => setTotal(Math.max(1, Number(event.target.value) || 1))} className="w-20 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-center text-lg font-bold" />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={quantitySelectable} onChange={(event) => setQuantitySelectable(event.target.checked)} className="h-4 w-4" />수량 선택 기능 켜기 (체크 해제 시 1개 고정)</label>
          <button className="w-full rounded-xl bg-blue-500 py-3 text-base font-bold text-white">추가하기</button>
        </form>
      </section>

      <section className="mt-5">
        <h3 className="text-xl font-extrabold">등록된 물품 목록</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-3xl">{item.icon}</span>
                <div className="min-w-0">
                  <p className="break-keep text-base font-bold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">총 {item.total}개</p>
                </div>
              </div>
              <button onClick={() => deleteItem(item.id)} className="text-rose-400" aria-label={`${item.name} 삭제`}><Trash2 className="h-5 w-5" /></button>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
