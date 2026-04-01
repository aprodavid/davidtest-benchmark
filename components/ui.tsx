import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto min-h-screen max-w-md bg-[#f2f4f7]">{children}</main>;
}

export function TopBar({ title, backHref }: { title: string; backHref?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-[74px] items-center border-b border-slate-200 bg-[#f6f7f9] px-4">
      {backHref ? (
        <Link href={backHref} className="mr-3 rounded-full p-1 text-slate-600">
          <ChevronLeft className="h-6 w-6" />
        </Link>
      ) : (
        <span className="mr-3 w-8" />
      )}
      <h1 className="text-[38px] font-extrabold tracking-[-0.02em] text-slate-900">{title}</h1>
    </header>
  );
}

export function BottomCTA({ label, disabled, onClick }: { label: string; disabled?: boolean; onClick: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md border-t border-slate-200 bg-[#eceff3] p-2">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full rounded-2xl py-4 text-2xl font-bold text-white ${disabled ? 'bg-slate-300' : 'bg-emerald-500'}`}
      >
        {label}
      </button>
    </div>
  );
}

export function LoadingBlock() {
  return <div className="p-6 text-center text-slate-500">데이터를 불러오는 중...</div>;
}
