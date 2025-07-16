import type { ReactNode } from 'react';
import Side from './components/Sidebar';

export default function SidebarOnlyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Side />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
