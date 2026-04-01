import Link from 'next/link';
import { Boxes, History, Settings } from 'lucide-react';
import { AppShell } from '@/components/ui';

export default function HomePage() {
  return (
    <AppShell>
      <div className="flex justify-end p-3">
        <Link href="/admin/login" className="rounded-full border border-slate-200 bg-white p-3 shadow-sm">
          <Settings className="h-6 w-6 text-slate-400" />
        </Link>
      </div>

      <section className="px-5 pt-24 text-center">
        <h1 className="text-[64px] font-extrabold leading-tight tracking-[-0.03em] text-slate-900">체육관 물품 관리</h1>
        <p className="mt-3 text-[42px] text-slate-500">쉽고 빠른 대여/반납 시스템</p>
      </section>

      <section className="mt-14 grid grid-cols-2 gap-4 px-5">
        <Link href="/borrow/select" className="rounded-3xl bg-emerald-500 p-7 text-center text-white shadow-lg shadow-emerald-200">
          <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-white/20">
            <Boxes className="h-14 w-14" />
          </div>
          <p className="text-[62px] font-bold">대여하기</p>
        </Link>

        <Link href="/return" className="rounded-3xl bg-rose-500 p-7 text-center text-white shadow-lg shadow-rose-200">
          <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-white/20">
            <History className="h-14 w-14" />
          </div>
          <p className="text-[62px] font-bold">반납하기</p>
        </Link>
      </section>
    </AppShell>
  );
}
