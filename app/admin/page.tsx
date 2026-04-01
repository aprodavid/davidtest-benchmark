import Link from 'next/link';
import { Box, List, Lock } from 'lucide-react';
import { AppShell, TopBar } from '@/components/ui';

const menus = [
  { href: '/admin/items', title: '물품 마스터 관리', desc: '새로운 교구 추가 및 기존 물품 삭제', icon: Box, tint: 'bg-blue-100 text-blue-500' },
  { href: '/admin/history', title: '전체 대여 기록', desc: '모든 대여 및 반납 히스토리 조회', icon: List, tint: 'bg-purple-100 text-purple-500' },
  { href: '/admin/settings', title: '관리자 설정', desc: '관리자 비밀번호 변경', icon: Lock, tint: 'bg-slate-100 text-slate-500', full: true }
];

export default function AdminPage() {
  return (
    <AppShell>
      <TopBar title="관리자 모드" backHref="/" />
      <section className="grid grid-cols-2 gap-4 px-4 pt-8">
        {menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <Link key={menu.href} href={menu.href} className={`rounded-3xl border border-slate-200 bg-white p-5 ${menu.full ? 'col-span-2' : ''}`}>
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${menu.tint}`}>
                <Icon className="h-8 w-8" />
              </div>
              <h2 className="mt-4 text-[20px] font-extrabold text-slate-900">{menu.title}</h2>
              <p className="mt-1 text-[16px] text-slate-500">{menu.desc}</p>
            </Link>
          );
        })}
      </section>
    </AppShell>
  );
}
