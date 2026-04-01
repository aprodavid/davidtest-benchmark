import Link from 'next/link';
import { Boxes, History, Settings } from 'lucide-react';
import { AppShell } from '@/components/ui';

export default function HomePage() {
  return (
    <AppShell>
      <div className="flex justify-end px-4 pb-3 pt-3 sm:px-6">
        <Link href="/admin/login" className="rounded-full border border-slate-200 bg-white p-3 shadow-sm">
          <Settings className="h-6 w-6 text-slate-400" />
        </Link>
      </div>

      <section className="px-5 pt-10 text-center sm:px-8 sm:pt-14 md:pt-20">
        <h1 className="break-keep text-[clamp(2.5rem,7vw,4rem)] font-extrabold leading-tight tracking-[-0.03em] text-slate-900">
          체육관 물품 관리
        </h1>
        <p className="mt-3 break-keep text-[clamp(1.5rem,4.4vw,2.625rem)] text-slate-500">쉽고 빠른 대여/반납 시스템</p>
      </section>

      <section className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 px-5 pb-8 sm:mt-14 sm:grid-cols-2 sm:px-8">
        <Link
          href="/borrow/select"
          className="flex min-h-[240px] flex-col items-center justify-center rounded-3xl bg-emerald-500 p-6 text-center text-white shadow-lg shadow-emerald-200 sm:min-h-[280px]"
        >
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 sm:h-28 sm:w-28">
            <Boxes className="h-14 w-14" />
          </div>
          <p className="break-keep text-[clamp(2rem,5vw,3.75rem)] font-bold leading-none">대여하기</p>
        </Link>

        <Link
          href="/return"
          className="flex min-h-[240px] flex-col items-center justify-center rounded-3xl bg-rose-500 p-6 text-center text-white shadow-lg shadow-rose-200 sm:min-h-[280px]"
        >
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 sm:h-28 sm:w-28">
            <History className="h-14 w-14" />
          </div>
          <p className="break-keep text-[clamp(2rem,5vw,3.75rem)] font-bold leading-none">반납하기</p>
        </Link>
      </section>
    </AppShell>
  );
}
