import React from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='h-full flex'>
      <Sidebar />
      <div className='flex-1 h-full overflow-y-auto'>{children}</div>
    </main>
  );
}
