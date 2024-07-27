import Navbar from '@/components/Navbar';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='h-full'>
      <Navbar />
      <div className='h-full pt-40'>{children}</div>
    </main>
  );
}
