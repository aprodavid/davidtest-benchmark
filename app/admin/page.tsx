import Link from 'next/link';
import { Box, List, Lock } from 'lucide-react';
import { AppShell, TopBar } from '@/components/ui';

const menus = [
  { href: '/admin/items', title: '물품 마스터 관리', desc: '새로운 교구 추가 및 기존 물품 삭제', icon: Box, tint: 'bg-blue-100 text-blue-500' },
  { href: '/admin/history', title: '전체 대여 기록', desc: '모든 대여 및 반납 히스토리 조회', icon: List, tint: 'bg-purple-100 text-purple-500' },
  { href: '/admin/settings', title: '관리자 설정', desc: '관리자 비밀번호 변경', icon: Lock, tint: 'bg-slate-100 text-slate-500' }
];

export default function AdminPage() {
  return (
    <AppShell>
      <TopBar title="관리자 모드" backHref="/" />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <Link key={menu.href} href={menu.href} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${menu.tint}`}><Icon className="h-6 w-6" /></div>
              <h2 className="mt-3 break-keep text-lg font-extrabold text-slate-900">{menu.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{menu.desc}</p>
            </Link>
          );
        })}
      </section>
    </AppShell>
  );
}
