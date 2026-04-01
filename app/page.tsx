import Link from 'next/link';
import { Boxes, History, Settings } from 'lucide-react';
import { AppShell } from '@/components/ui';

export default function HomePage() {
  return (
    <AppShell>
      <div className="flex justify-end">
        <Link href="/admin/login" className="rounded-full border border-slate-200 bg-white p-3 shadow-sm" aria-label="관리자 설정">
          <Settings className="h-5 w-5 text-slate-500" />
        </Link>
      </div>

      <section className="px-1 pt-10 text-center sm:pt-14">
        <h1 className="break-keep text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">체육관 물품 관리</h1>
        <p className="mt-2 break-keep text-base text-slate-500 sm:text-lg">쉽고 빠른 대여/반납 시스템</p>
      </section>

      <section className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
        <Link href="/borrow/select" className="rounded-3xl bg-emerald-500 p-6 text-center text-white shadow-lg shadow-emerald-200">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Boxes className="h-8 w-8" />
          </div>
          <p className="text-2xl font-bold sm:text-3xl">대여하기</p>
        </Link>

        <Link href="/return" className="rounded-3xl bg-rose-500 p-6 text-center text-white shadow-lg shadow-rose-200">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <History className="h-8 w-8" />
          </div>
          <p className="text-2xl font-bold sm:text-3xl">반납하기</p>
        </Link>
      </section>
    </AppShell>
  );
}
