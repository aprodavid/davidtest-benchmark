import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export function Screen({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto min-h-screen max-w-md bg-canvas pb-24">{children}</main>;
}

export function Header({ title, backHref }: { title: string; backHref: string }) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-canvas px-4 py-4">
      <Link href={backHref} className="rounded-full p-1 text-slate-700">
        <ChevronLeft className="h-6 w-6" />
      </Link>
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
    </header>
  );
}

export function BottomAction({ label, disabled, onClick }: { label: string; disabled?: boolean; onClick: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md border-t border-slate-200 bg-canvas p-3">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full rounded-2xl py-4 text-2xl font-bold text-white ${
          disabled ? 'bg-slate-300' : 'bg-emerald-500'
        }`}
      >
        {label}
      </button>
    </div>
  );
}
