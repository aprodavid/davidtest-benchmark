import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/app-state';

export const metadata: Metadata = {
  title: '체육 물품 관리 데모',
  description: '모바일 우선 대여/반납 관리 데모 앱'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
