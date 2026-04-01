import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-3 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}

export function TopBar({ title, backHref }: { title: string; backHref?: string }) {
  return (
    <header className="sticky top-0 z-20 mb-4 flex min-h-16 items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 px-3 backdrop-blur">
      {backHref ? (
        <Link href={backHref} className="rounded-full p-1.5 text-slate-600 hover:bg-slate-100" aria-label="뒤로가기">
          <ChevronLeft className="h-5 w-5" />
        </Link>
      ) : null}
      <h1 className="min-w-0 break-keep text-xl font-extrabold text-slate-900 sm:text-2xl">{title}</h1>
    </header>
  );
}

export function BottomCTA({ label, disabled, onClick }: { label: string; disabled?: boolean; onClick: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 p-3 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-1 sm:px-4">
        <button
          onClick={onClick}
          disabled={disabled}
          className={`w-full rounded-2xl px-4 py-3 text-base font-bold text-white transition sm:text-lg ${disabled ? 'cursor-not-allowed bg-slate-300' : 'bg-emerald-500 hover:bg-emerald-600'}`}
        >
          {label}
        </button>
      </div>
    </div>
  );
}

export function LoadingBlock() {
  return <div className="rounded-2xl bg-white p-8 text-center text-slate-500">데이터를 불러오는 중...</div>;
}
