import Link from 'next/link';
import { Header, Screen } from '@/components/ui';

const menus = [
  { href: '/admin/items', title: '물품 마스터 관리', desc: '새로운 물품 추가 및 삭제', icon: '📦' },
  { href: '/admin/history', title: '전체 대여 기록', desc: '모든 대여 및 반납 히스토리', icon: '📋' },
  { href: '/admin/settings', title: '관리자 설정', desc: '관리자 비밀번호 변경', icon: '🔒', full: true }
];

export default function AdminPage() {
  return (
    <Screen>
      <Header title="관리자 모드" backHref="/" />
      <section className="grid grid-cols-2 gap-4 px-4 pt-8">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={`rounded-3xl bg-white p-5 shadow-card ${menu.full ? 'col-span-2' : ''}`}
          >
            <div className="text-6xl">{menu.icon}</div>
            <h2 className="mt-3 text-5xl font-extrabold">{menu.title}</h2>
            <p className="mt-1 text-3xl text-slate-500">{menu.desc}</p>
          </Link>
        ))}
      </section>
    </Screen>
  );
}
