import React from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import SearchCommand from '@/components/modals/SearchCommand';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='h-full flex'>
      <Sidebar />
      <div className='flex-1 h-full overflow-y-auto dark:bg-[#1f1f1f]'>
        <SearchCommand />
        {children}
      </div>
    </main>
  );
}
