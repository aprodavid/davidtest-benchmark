import Link from 'next/link';
import { Boxes, History, Settings } from 'lucide-react';
import { Screen } from '@/components/ui';

export default function HomePage() {
  return (
    <Screen>
      <div className="flex justify-end p-4">
        <Link href="/admin/login" className="rounded-full border border-slate-200 bg-white p-3 shadow-card">
          <Settings className="h-6 w-6 text-slate-400" />
        </Link>
      </div>

      <section className="px-6 pt-20 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight text-slate-800">체육 물품 관리</h1>
        <p className="mt-4 text-4xl text-slate-500">쉽고 빠른 대여/반납 시스템</p>
      </section>

      <section className="mt-12 grid grid-cols-2 gap-4 px-5">
        <Link href="/rent/step-1" className="rounded-3xl bg-emerald-500 p-8 text-center text-white shadow-card">
          <Boxes className="mx-auto mb-6 h-14 w-14 opacity-90" />
          <span className="text-6xl font-bold">대여하기</span>
        </Link>
        <Link href="/return" className="rounded-3xl bg-rose-500 p-8 text-center text-white shadow-card">
          <History className="mx-auto mb-6 h-14 w-14 opacity-90" />
          <span className="text-6xl font-bold">반납하기</span>
        </Link>
      </section>
    </Screen>
  );
}
