'use client';

import { useRouter } from 'next/navigation';
import { BottomAction, Header, Screen } from '@/components/ui';
import { useAppState } from '@/lib/app-state';

const grades = ['1', '2', '3', '4', '5', '6'];
const classes = ['1', '2', '3', '4', '5', '6'];

export default function BorrowerPage() {
  const router = useRouter();
  const {
    items,
    rentDraft,
    setBorrowerMode,
    setGrade,
    setClassRoom,
    setCustomBorrower,
    completeRent
  } = useAppState();

  const summary = items.filter((item) => rentDraft.selectedIds.includes(item.id));

  const canSubmit =
    rentDraft.borrowerMode === 'class' ? !!(rentDraft.grade && rentDraft.classRoom) : rentDraft.customBorrower.trim().length > 0;

  return (
    <Screen>
      <Header title="물품 대여하기" backHref="/rent/step-2" />
      <p className="px-5 py-6 text-4xl text-slate-500">누가 빌리는지 알려주세요</p>

      <section className="mx-4 rounded-3xl bg-white p-4 shadow-card">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
          <button
            className={`rounded-2xl py-3 text-3xl font-bold ${rentDraft.borrowerMode === 'class' ? 'bg-white text-emerald-700' : 'text-slate-500'}`}
            onClick={() => setBorrowerMode('class')}
          >
            학년 / 반 선택
          </button>
          <button
            className={`rounded-2xl py-3 text-3xl font-bold ${rentDraft.borrowerMode === 'custom' ? 'bg-white text-emerald-700' : 'text-slate-500'}`}
            onClick={() => setBorrowerMode('custom')}
          >
            직접 입력
          </button>
        </div>

        {rentDraft.borrowerMode === 'class' ? (
          <div className="mt-5 grid grid-cols-2 gap-3">
            <label className="text-2xl text-slate-500">
              학년 (GRADE)
              <select
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-4xl font-bold"
                value={rentDraft.grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                {grades.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </label>
            <label className="text-2xl text-slate-500">
              반 (CLASS)
              <select
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-4xl font-bold"
                value={rentDraft.classRoom}
                onChange={(e) => setClassRoom(e.target.value)}
              >
                {classes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
        ) : (
          <div className="mt-5">
            <label className="text-2xl text-slate-500">이름 또는 부서 입력</label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-4xl"
              placeholder="예) 체육부 담당자"
              value={rentDraft.customBorrower}
              onChange={(e) => setCustomBorrower(e.target.value)}
            />
          </div>
        )}
      </section>

      <section className="mx-4 mt-5 rounded-3xl bg-emerald-50 p-4">
        <h3 className="text-4xl font-bold text-emerald-900">대여 요약</h3>
        <ul className="mt-3 space-y-2 text-4xl text-emerald-900">
          {summary.map((item) => (
            <li key={item.id}>• {item.name} {rentDraft.quantities[item.id] ?? 1}개</li>
          ))}
        </ul>
      </section>

      <BottomAction
        label="대여 완료하기"
        disabled={!canSubmit}
        onClick={() => {
          completeRent();
          router.push('/');
        }}
      />
    </Screen>
  );
}
