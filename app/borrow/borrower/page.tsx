'use client';

import { useRouter } from 'next/navigation';
import { ClipboardList, User } from 'lucide-react';
import { AppShell, BottomCTA, LoadingBlock, TopBar } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

const grades = ['1', '2', '3', '4', '5', '6'];
const classes = ['1', '2', '3', '4', '5', '6'];

export default function BorrowBorrowerPage() {
  const router = useRouter();
  const { hydrated, items, draft, setDraftTab, setDraftGrade, setDraftClass, setDraftCustomName, submitBorrow } = useAppState();

  if (!hydrated) return <AppShell><TopBar title="물품 대여하기" backHref="/borrow/quantity" /><LoadingBlock /></AppShell>;

  const selected = items.filter((item) => draft.selectedItemIds.includes(item.id));
  const canSubmit = draft.borrowerTab === 'class' ? !!(draft.grade && draft.classRoom) : !!draft.customName.trim();

  return (
    <AppShell>
      <TopBar title="물품 대여하기" backHref="/borrow/quantity" />
      <p className="mb-4 break-keep text-sm text-slate-500 sm:text-base">누가 빌리는지 알려주세요</p>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          <button onClick={() => setDraftTab('class')} className={`rounded-lg py-2 text-sm font-bold ${draft.borrowerTab === 'class' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}>학년 / 반 선택</button>
          <button onClick={() => setDraftTab('custom')} className={`rounded-lg py-2 text-sm font-bold ${draft.borrowerTab === 'custom' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}>직접 입력</button>
        </div>

        {draft.borrowerTab === 'class' ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold uppercase text-slate-500">학년 (GRADE)
              <select value={draft.grade} onChange={(e) => setDraftGrade(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-base font-semibold">
                {grades.map((grade) => <option key={grade} value={grade}>{grade}학년</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold uppercase text-slate-500">반 (CLASS)
              <select value={draft.classRoom} onChange={(e) => setDraftClass(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-base font-semibold">
                {classes.map((value) => <option key={value} value={value}>{value}반</option>)}
              </select>
            </label>
          </div>
        ) : (
          <div className="mt-4">
            <label className="text-sm font-semibold text-slate-600">이름 또는 부서 입력</label>
            <div className="relative mt-2">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={draft.customName} onChange={(e) => setDraftCustomName(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-3 text-base" placeholder="예) 홍길동 선생님, 학생회" />
            </div>
          </div>
        )}
      </section>

      <section className="mt-4 rounded-2xl bg-emerald-50 p-4">
        <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-900"><ClipboardList className="h-5 w-5" />대여 요약</h3>
        <ul className="mt-2 space-y-1 text-sm text-emerald-900 sm:text-base">
          {selected.map((item) => <li key={item.id}>• {item.name} <strong>{item.quantitySelectable ? draft.quantities[item.id] ?? 1 : 1}개</strong></li>)}
        </ul>
      </section>

      <BottomCTA label="대여 완료하기" disabled={!canSubmit || !selected.length} onClick={() => { submitBorrow(); router.push('/'); }} />
    </AppShell>
  );
}
